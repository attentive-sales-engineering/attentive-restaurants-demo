// attentiveapis.js

// Set your Attentive API key
const apiKey = 'NjYxR2UxWjZmbE5mM0N2NGNLZ0RuMHN0Um5qcjlUM2xVWUMx';


// subscribe form listener
document.addEventListener("DOMContentLoaded", function() {
    const phoneNumberInput = document.getElementById("mce-PHONE");
    
    // Add an event listener to the form submit button
    document.getElementById("sign-up-form-phone").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
    
        const phoneNumber = phoneNumberInput.value; // Get the phone number value from the input field
        console.log(phoneNumber); // This will log the inputted phone number to the console
    
        // Call the addSubscriber function
        addSubscriber(phoneNumber);
    });

    document.getElementById("orderSubmitButton").addEventListener("click", function(event) {
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;
        const streetAddress = document.querySelector('input[name="streetAddress"]').value;
        // const city = document.querySelector('input[name="city"]').value;
        // const state = document.querySelector('select[name="state"]').value;
        // const zipcode = document.querySelector('input[name="zipcode"]').value;
        const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
        const emailAddress = document.querySelector('input[name="emailAddress"]').value;
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
        
            // Call the purchaseEvent function for each cart item
            purchaseEvent([{ name, price }], emailAddress, phoneNumber);
        }); 
        
        // Redirect to the confirmation page
        window.location.href = "confirmation.html";

    })
});

// default values in the order form
if (window.location.pathname.endsWith("checkout.html")) {
    window.addEventListener('DOMContentLoaded', function() {
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
  
// add subscriber api
function addSubscriber(phoneNumber, emailAddress = null) {
    const apiUrl = 'https://attentive-api-swagger.herokuapp.com/subscriptions';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${apiKey}`);

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
    .catch(error => {console.error('API request failed', error);});    
}
  
// custom attributes api
function customAttributes(firstName, lastName, emailAddress, phoneNumber) {
    // Attentive API endpoint URL
    const apiUrl = 'https://attentive-api-swagger.herokuapp.com/attributes/custom';
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${apiKey}`);

    var raw = JSON.stringify({
    "properties": {
        "firstName": firstName,
        "lastName": lastName,
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
    .then(result => console.log(result + " Custom Attribute API Success"))
    .catch(error => console.log('error', error));

}
  
// purchase event api
function purchaseEvent(cartItem, emailAddress, phoneNumber) {
    // Attentive API endpoint URL
    const apiUrl = 'https://attentive-api-swagger.herokuapp.com/events/ecommerce/purchase';
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${apiKey}`);
    const name = cartItem[0].name;
    const price = cartItem[0].price;
    
    console.log(`Name: ${name}, Price: ${price}`);

    const productId =  name.replace(/\s/g, ''); // Remove spaces from the name

    var raw = JSON.stringify({
        "items": [
            {
                "productId": productId + "123",
                "productVariantId": productId + "123V",
                "name": name,
                "price": [
                    {
                        "value": price,
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
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
