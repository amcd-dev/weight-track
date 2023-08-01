export const apiPath = () => {
    if (location.hostname === 'localhost') {
        console.log('>>> Determined location.hostname is Local Host: ', location.hostname)
        return 'http://localhost:3000'
    } else {
        console.log('>>> Determined location.hostname is fi-fit: ', location.hostname)
        return 'https://weight-track-umber.vercel.app'
    }
}

export function localTimeDisplay () {
    const d = new Date()
    return d.toLocaleTimeString()
}

export function roundTwoDecimal(num) {
    return (Math.round(num * 100) / 100)
}

export function formatDateFromEpoch(epochTime) {
    // Create a new Date object using the epoch time (milliseconds since January 1, 1970)
    const date = new Date(epochTime);

    // Array of month names to use in the formatted date
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Array of day names to use in the formatted date
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the day of the week, day of the month, month, year, and time of day
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    hours %= 12;
    hours = hours || 12; // Handle midnight (0 hours)

    // Form the final formatted date string
    return `${dayOfWeek} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} ${month} ${year}, ${hours}:${padZero(minutes)}${ampm}`;
}

// Helper function to get the ordinal suffix for the day of the month
function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

// Helper function to pad single digits with leading zero
function padZero(number) {
    return number.toString().padStart(2, '0');
}