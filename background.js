// Code for managing background behavior

// Listen for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'startTimer') {
    // Handle starting the timer (if needed)
    // You can add your logic here for handling the start of the timer
  } else if (message.type === 'stopTimer') {
    // Handle stopping the timer (if needed)
    // You can add your logic here for handling the stop of the timer
  }
});
