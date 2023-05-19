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
      const defaultPhoneNumber = '555-123-4567';
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
  
  
// Add an event listener to the form submit button
const orderSubmitButton = document.getElementById("orderSubmitButton");
if (orderSubmitButton) {
  orderSubmitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Extracting values from the form
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const streetAddress = document.querySelector('input[name="streetAddress"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const state = document.querySelector('select[name="state"]').value;
    const zipcode = document.querySelector('input[name="zipcode"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
    const emailAddress = document.querySelector('input[name="emailAddress"]').value;
    const smsMarketingOptIn = document.getElementById("smsMarketingOptIn").checked;
    const smsTransactionalOptIn = document.getElementById("smsTransactionalOptIn").checked;
    const pickupDelivery = document.querySelector('input[name="pickupDelivery"]:checked').value;
    const paymentType = document.querySelector('input[name="payment_type"]:checked').value;

    // Log the extracted values to the console
    console.log(firstName);
    console.log(lastName);
    console.log(streetAddress);
    console.log(city);
    console.log(state);
    console.log(zipcode);
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

    // Call the purchaseEvent function
    purchaseEvent(selectedItems, emailAddress, phoneNumber);
    
    // Redirect to the confirmation page
    window.location.href = "confirmation.html";

    // Remove the event listener
    document.getElementById("orderSubmitButton").removeEventListener("click", arguments.callee);
  });
}

// add subscriber api
function addSubscriber(phoneNumber, emailAddress = null) {
    const apiUrl = 'https://api.attentivemobile.com/v1/subscriptions';
  
    // Create the request headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  
    // Construct the request body
    const requestBody = {
        user: {
          phone: phoneNumber,
          email: emailAddress
        },
        signUpSourceId: 'restaurantdemo1',
        locale: {
          language: 'en',
          country: 'US'
        },
        subscriptionType: ['MARKETING', 'TRANSACTIONAL']
      };
      
  
    // Make the API request to add a subscriber
    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          console.log('Subscriber added successfully');
        } else {
          console.error('Failed to add subscriber');
        }
      })
      .catch(error => {
        console.error('API request failed', error);
      });
}
  
// custom attributes api
function customAttributes(firstName, lastName, emailAddress, phoneNumber) {
    // Attentive API endpoint URL
    const apiUrl = 'https://api.attentivemobile.com/v1/attributes/custom';
  
    // Attentive API request payload
    const payload = {
      properties: {
        'First Name': firstName,
        'Last Name': lastName,
      },
      user: {
        phone: phoneNumber,
        email: emailAddress,
      }
    };
  
    // Attentive API request headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  
    // Make a POST request to the Attentive API
    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Attentive API response:', data);
        // Handle the API response as needed
      })
      .catch(error => {
        console.error('Error occurred:', error);
        // Handle the error as needed
      });
}
  
// purchase event api
function purchaseEvent(cartItems, emailAddress, phoneNumber) {
    // Attentive API endpoint URL
    const apiUrl = 'https://api.attentivemobile.com/v1/events/ecommerce/purchase';
  
    // Format the cart items into an array of item objects
    const items = cartItems.map((item, index) => {
        const productId = `product${index + 1}`; // Generate dynamic productId based on item index
        const productVariantId = `${productId}a`; // Generate dynamic productVariantId based on productId
        const name = item.querySelector('.name a').textContent;
        const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
      
        return {
        productId: productId,
        productVariantId: productVariantId,
        name: name,
        price: [
          {
            value: price,
            currency: 'USD'
          }
        ],
        quantity: 1
      };
    });
  
    // Attentive API request payload
    const payload = {
      items: items,
      occurredAt: new Date().toISOString(),
      user: {
        phone: phoneNumber,
        email: emailAddress,
      }
    };
  
    // Attentive API request headers
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YOUR_TOKEN_HERE' // Replace with your actual authorization token
    };
  
    // Make a POST request to the Attentive API
    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Attentive API response:', data);
        // Handle the API response as needed
      })
      .catch(error => {
        console.error('Error occurred:', error);
        // Handle the error as needed
      });
}
  