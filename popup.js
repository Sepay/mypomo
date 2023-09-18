let originalMinute = 25;  // Original minute value
let originalSecond = 0;   // Original second value
let intervalId;  // Variable to store the interval ID

let minute = originalMinute;  // Current minute value
let second = originalSecond;  // Current second value

const circle = document.getElementById('hh');  // Get the circle element
const counter = document.getElementById('counter');  // Get the counter element

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

  // Reset the circle's dasharray to create a full border
  circle.style.strokeDasharray = `${circle.getTotalLength()}`;

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

    // Calculate the remaining time in seconds
    const totalTimeInSeconds = originalMinute * 60;
    const remainingTimeInSeconds = minute * 60 + second;

    // Calculate the dasharray value to make the border disappear
    const dasharrayValue = (remainingTimeInSeconds / totalTimeInSeconds) * circle.getTotalLength();

    // Update the circle's stroke-dasharray property
    circle.style.strokeDasharray = `${dasharrayValue} ${circle.getTotalLength()}`;

    // Format the time and update the counter display in the popup
    document.getElementById('counter').innerText = `${formatTime(minute)}:${formatTime(second)}`;
  }, 1000);
});

document.getElementById('stopButton').addEventListener('click', () => {
  // Reset the timer to the original time (25 minutes)
  minute = originalMinute;
  second = originalSecond;

  // Clear the existing interval
  clearInterval(intervalId);

  // Reset the circle's dasharray to create a full border
  circle.style.strokeDasharray = `${circle.getTotalLength()}`;

  // Format the time and update the counter display in the popup
  document.getElementById('counter').innerText = `${formatTime(minute)}:${formatTime(second)}`;
});
