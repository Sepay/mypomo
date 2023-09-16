let intervalId;
let isBreakTime = false;

function startTimer(minutes, seconds) {
  intervalId = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      if (isBreakTime) {
        // Send a message to the popup to update the counter for the break
        chrome.runtime.sendMessage({ type: 'updateCounter', counter: '00:00' });

        // Reset to the original timer for the next work session
        minutes = 24;
        seconds = 60;
        isBreakTime = false;
      } else {
        // Send a message to the popup to indicate the end of the work session
        chrome.runtime.sendMessage({ type: 'workSessionEnded' });

        // Switch to break time (5 minutes)
        minutes = 4;
        seconds = 60;
        isBreakTime = true;

        // Notify popup to start the break timer
        chrome.runtime.sendMessage({ type: 'startBreakTimer' });
      }
    } else {
      seconds--;
      if (seconds === 0) {
        minutes--;
        seconds = 60;
      }
    }

    // Send a message to the popup to update the counter
    chrome.runtime.sendMessage({ type: 'updateCounter', counter: `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}` });
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'startTimer') {
    stopTimer(); // Reset the timer before starting
    startTimer(isBreakTime ? 4 : 24, 60);
  } else if (message.type === 'stopTimer') {
    stopTimer();
  }
});
