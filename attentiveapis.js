// attentiveapis.js

const phoneNumber = document.getElementById("mce-PHONE").value; // Get the phone number value from the input field


// Set your Attentive API key
const apiKey = 'NjYxR2UxWjZmbE5mM0N2NGNLZ0RuMHN0Um5qcjlUM2xVWUMx';

// Function to add a subscriber
function addSubscriber(phoneNumber) {
  // Create the request headers
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  // Construct the request body
  const body = {
    phone: phoneNumber
    // Include other subscriber data if required
  };

  // Make the API request to add a subscriber
  fetch('https://api.attentivemobile.com/v2/subscribers', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => {
      // Handle the API response
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

// Function to add a subscriber
function addSubscriber(email, phoneNumber) {
    // Create the request headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  
    // Construct the request body
    const body = {
      email: email,
      phone: phoneNumber
      // Include other subscriber data if required
    };
  
    // Make the API request to add a subscriber
    fetch('https://api.attentivemobile.com/v2/subscribers', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        // Handle the API response
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
  

// Function to add custom attributes for a subscriber
function addCustomAttributes(subscriberId, attributes) {
  // Create the request headers
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  // Construct the request body
  const body = {
    subscriberId: subscriberId,
    attributes: attributes
  };

  // Make the API request to add custom attributes
  fetch('https://api.attentivemobile.com/v2/custom-attributes', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => {
      // Handle the API response
      if (response.ok) {
        console.log('Custom attributes added successfully');
      } else {
        console.error('Failed to add custom attributes');
      }
    })
    .catch(error => {
      console.error('API request failed', error);
    });
}

// Function to send a purchase event
function sendPurchaseEvent(customerId, orderId, totalAmount) {
    // Create the request headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  
    // Construct the request body
    const body = {
      customerId: customerId,
      orderId: orderId,
      totalAmount: totalAmount
      // Include other event data if required
    };
  
    // Make the API request to send a purchase event
    fetch('https://api.attentivemobile.com/v2/events/purchase', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        // Handle the API response
        if (response.ok) {
          console.log('Purchase event sent successfully');
        } else {
          console.error('Failed to send purchase event');
        }
      })
      .catch(error => {
        console.error('API request failed', error);
      });
  }
  

// Export the functions or class if you're using modules
// export { addSubscriber, addCustomAttributes };
