// /Day-23/script.js

const timeInput = document.getElementById("time-input");
const timeZoneSelect = document.getElementById("timezone-select");
const targetTimeZoneSelect = document.getElementById("target-timezone-select");
const convertBtn = document.getElementById("convert-btn");
const convertedTimeDisplay = document.getElementById("converted-time");

const timeZones = {
  "EST": -5,
  "PST": -8,
  "IST": 5.5,
  "CST": -6,
  "GMT": 0,
  "CET": 1
};

function convertTime() {
  const inputTime = timeInput.value; // Get the input time (format HH:MM)
  const selectedTimeZone = timeZoneSelect.value; // Get the selected timezone
  const targetTimeZone = targetTimeZoneSelect.value; // Get the target timezone

  if (!inputTime || selectedTimeZone === "" || targetTimeZone === "") {
    alert("Please fill out all fields.");
    return;
  }

  const [hours, minutes] = inputTime.split(":").map(Number); // Split and parse the input time

  if (isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59) {
    alert("Please enter a valid time.");
    return;
  }

  const selectedTimeZoneOffset = timeZones[selectedTimeZone];
  const targetTimeZoneOffset = timeZones[targetTimeZone];

  const currentDate = new Date();
  currentDate.setHours(hours, minutes, 0);

  // Calculate the offset difference
  const timeDifference = (targetTimeZoneOffset - selectedTimeZoneOffset) * 60 * 60 * 1000;
  
  // Add the time difference to the current time
  const convertedDate = new Date(currentDate.getTime() + timeDifference);

  const convertedHours = convertedDate.getHours();
  const convertedMinutes = convertedDate.getMinutes();
  const period = convertedHours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format and handle edge cases for midnight and noon
  const formattedHours = convertedHours % 12 === 0 ? 12 : convertedHours % 12;
  const formattedMinutes = convertedMinutes < 10 ? `0${convertedMinutes}` : convertedMinutes;

  const convertedTimeString = `${formattedHours}:${formattedMinutes} ${period}`;
  convertedTimeDisplay.textContent = `Converted Time: ${convertedTimeString}`;
}

convertBtn.addEventListener("click", convertTime);

