// attentiveapis.js


// finds Attentive API Key
function getCookie (cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

const attentiveApiKey = getCookie('attentiveApiKey')

// default values in the order form
if (window.location.pathname.endsWith("checkout.html")) {
    window.addEventListener('DOMContentLoaded', function () {
        // Default values
        const defaultFirstName = 'John';
        const defaultLastName = 'Doe';
        const defaultStreetAddress = '123 Main St';
        const defaultCity = 'New York';
        const defaultState = 'NY';
        const defaultZipcode = '10001';
        const defaultPhoneNumber = '+1-646-504-3689';
        const defaultEmailAddress = 'johndoe@example.com';

        // Set default values to the form fields
        document.querySelector('input[name="firstName"]').value = defaultFirstName;
        document.querySelector('input[name="lastName"]').value = defaultLastName;
        document.querySelector('input[name="streetAddress"]').value = defaultStreetAddress;
        document.querySelector('input[name="city"]').value = defaultCity;
        document.querySelector('select[name="state"]').value = defaultState;
        document.querySelector('input[name="zipcode"]').value = defaultZipcode;
        document.querySelector('input[name="phoneNumber"]').value = defaultPhoneNumber;
        document.querySelector('input[name="emailAddress"]').value = defaultEmailAddress;
    });
}

// subscribe and checkout form listeners 
document.addEventListener("DOMContentLoaded", function () {
    const phoneNumberInput = document.getElementById("mce-PHONE");

    // Add an event listener to the form submit button
    document.getElementById("sign-up-form-phone").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const phoneNumber = phoneNumberInput.value; // Get the phone number value from the input field
        console.log(phoneNumber); // This will log the inputted phone number to the console

        // Call the addSubscriber function
        addSubscriber(phoneNumber);
    });

    if (window.location.pathname.endsWith("checkout.html")) {
        document.getElementById("checkoutForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            // const streetAddress = document.getElementById("streetAddress").value;
            // const city = document.getElementById("city").value;
            // const state = document.getElementById("state").value;
            // const zipcode = document.getElementById("zipcode").value;
            const phoneNumber = document.getElementById("phoneNumber").value;
            const emailAddress = document.getElementById("emailAddress").value;
            const smsMarketingOptIn = document.getElementById("smsMarketingOptIn").checked;
            const smsTransactionalOptIn = document.getElementById("smsTransactionalOptIn").checked;
            const pickupDelivery = document.querySelector('input[name="pickupDelivery"]:checked').value;
            const paymentType = document.querySelector('input[name="payment_type"]:checked').value;


            // Log the extracted values to the console
            console.log(firstName);
            console.log(lastName);
            //console.log(streetAddress);
            //console.log(city);
            //console.log(state);
            //console.log(zipcode);
            console.log(phoneNumber);
            console.log(emailAddress);
            console.log(smsMarketingOptIn);
            console.log(smsTransactionalOptIn);
            console.log(pickupDelivery);
            console.log(paymentType);

            // Extract cart values
            const cartItems = Array.from(document.querySelectorAll('.cart-table tr'));
            const halfLength = Math.ceil(cartItems.length / 2);
            const selectedItems = cartItems.slice(0, halfLength);
            const cartSummary = document.querySelector('.cart-summary');
            const cartProductsTotal = cartSummary.querySelector('.cart-products-total').textContent;
            const cartDelivery = cartSummary.querySelector('.cart-delivery').textContent;
            const cartTotal = cartSummary.querySelector('.cart-total').textContent;

            // Log cart values
            console.log("Cart Items:");
            selectedItems.forEach((item) => {
                const name = item.querySelector('.name a').textContent;
                const caption = item.querySelector('.caption').textContent;
                const price = item.querySelector('.price').textContent;
                console.log(`- Name: ${name}, Caption: ${caption}, Price: ${price}`);
            });

            console.log("Cart Summary:");
            console.log(`- Products Total: ${cartProductsTotal}`);
            console.log(`- Delivery: ${cartDelivery}`);
            console.log(`- Total: ${cartTotal}`);

            // Call the addSubscriber function
            addSubscriber(phoneNumber, emailAddress);

            // Call the custom attributes function for first name and last name
            customAttributes(firstName, lastName, emailAddress, phoneNumber);

            // Call the purchaseEvent function for each cart item
            selectedItems.forEach((cartItem) => {
                const name = cartItem.querySelector('.name a').textContent;
                const price = cartItem.querySelector('.price').textContent;
                purchaseEvent([{ name, price }], emailAddress, phoneNumber);
            });
        
            // Redirect to the confirmation page
            setTimeout(function() {
                window.location.href = "confirmation.html";
            }, 1500); // 1.5 seconds delay (1500 milliseconds)
           
        });
    }
});

// add subscriber api
function addSubscriber(phoneNumber, emailAddress = null) {
    const apiUrl = 'https://attentive-api-swagger.herokuapp.com/#/Subscribers/addSubscriptions';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${attentiveApiKey}`);

    var raw = JSON.stringify({
        "user": {
            "phone": phoneNumber,
            "email": emailAddress
        },
        "signUpSourceId": "440341"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => { console.error('API request failed', error); });
}

// custom attributes api
function customAttributes(firstName, lastName, emailAddress, phoneNumber) {
    // Attentive API endpoint URL
    const apiUrl = 'https://attentive-api-swagger.herokuapp.com/#/Custom%20Attributes/postCustomAttributes';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${attentiveApiKey}`);

    var raw = JSON.stringify({
        "properties": {
            "First Name": firstName,
            "Last Name": lastName,
        },
        "user": {
            "phone": phoneNumber,
            "email": emailAddress
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.text())
        .then(result => console.log("Custom Attribute API Success " + result))
        .catch(error => console.log('error', error));

}

// purchase event api
function purchaseEvent(cartItem, emailAddress, phoneNumber) {
    // Attentive API endpoint URL
    const apiUrl = 'https://attentive-api-swagger.herokuapp.com/#/eCommerce/postPurchaseEvents';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${attentiveApiKey}`);
    const name = cartItem[0].name;
    const price = cartItem[0].price;

    console.log(`Name: ${name}, Price: ${price}`);

    const productId = name.replace(/\s/g, ''); // Remove spaces from the name
    const priceValue = parseFloat(price.replace(/[^0-9.-]+/g, ""))

    var raw = JSON.stringify({
        "items": [
            {
                "productId": productId + "123",
                "productVariantId": productId + "123V",
                "name": name,
                "price": [
                    {
                        "value": priceValue,
                        "currency": "USD"
                    }
                ],
                "quantity": 1
            }
        ],
        "user": {
            "phone": phoneNumber,
            "email": emailAddress
        }
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(apiUrl, requestOptions)
        .then(response => response.text())
        .then(result => console.log("Purchase Events API Success " + result))
        .catch(error => console.log('error', error));
}

