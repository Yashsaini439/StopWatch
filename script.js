let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapsList = document.getElementById('lapsList');

// Formats milliseconds into MM:SS:MS
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

// Update time on UI
function updateDisplay() {
  const currentTime = Date.now();
  const totalMs = elapsedTime + (currentTime - startTime);
  display.textContent = formatTime(totalMs);
}

// Toggle Start / Stop functionality
startStopBtn.addEventListener('click', () => {
  if (!isRunning) {
    // Start timer
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    isRunning = true;

    // Change to Stop button with red background
    startStopBtn.textContent = 'Stop';
    startStopBtn.classList.add('stop');

    // Reset Lap button text
    lapResetBtn.textContent = 'Lap';
  } else {
    // Stop timer
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    isRunning = false;

    // Change back to Start button
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');

    // Change Lap button to Reset
    lapResetBtn.textContent = 'Reset';
  }
});

// Lap / Reset functionality
lapResetBtn.addEventListener('click', () => {
  if (isRunning) {
    // Prepend lap entry with current time
    lapCount++;
    const currentTimeText = display.textContent;
    const li = document.createElement('li');
    
    li.innerHTML = `
      <span class="lap-count">Lap ${lapCount}</span>
      <span>${currentTimeText}</span>
    `;
    
    lapsList.prepend(li);
  } else {
    // Reset stopwatch and state
    clearInterval(timer);
    elapsedTime = 0;
    lapCount = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
  }
});