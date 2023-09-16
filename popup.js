let originalMinute = 25;  // Original minute value
let originalSecond = 0;   // Original second value
let intervalId;  // Variable to store the interval ID

let minute = originalMinute;  // Current minute value
let second = originalSecond;  // Current second value

// Helper function to format time (add leading zero if needed)
function formatTime(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

document.getElementById('startButton').addEventListener('click', () => {
  // Reset the timer to the original time (25 minutes)
  minute = originalMinute;
  second = originalSecond;

  // Clear the existing interval if any
  clearInterval(intervalId);

  // Format the time and update the counter display in the popup
  document.getElementById('counter').innerText = `${formatTime(minute)}:${formatTime(second)}`;

  // Send a message to the background script to start the timer
  chrome.runtime.sendMessage({ type: 'startTimer' });

  // Start a new interval with the original timer values
  intervalId = setInterval(() => {
    if (minute === 0 && second === 1) {
      // Stop the timer when it reaches 00:00
      clearInterval(intervalId);
    } else {
      if (second === 0) {
        minute--;
        second = 59;
      } else {
        second--;
      }
    }
    // Format the time and update the counter display in the popup
    document.getElementById('counter').innerText = `${formatTime(minute)}:${formatTime(second)}`;
  }, 1000);
});

document.getElementById('stopButton').addEventListener('click', () => {
  // Send a message to the background script to stop the timer
  chrome.runtime.sendMessage({ type: 'stopTimer' });

  // Reset the timer to the original time (25 minutes)
  minute = originalMinute;
  second = originalSecond;

  // Clear the existing interval
  clearInterval(intervalId);

  // Format the time and update the counter display in the popup
  document.getElementById('counter').innerText = `${formatTime(minute)}:${formatTime(second)}`;
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'updateCounter') {
    // Format the time and update the counter display in the popup
    document.getElementById('counter').innerText = message.counter;
  }
});
