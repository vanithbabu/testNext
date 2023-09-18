export function formatDate(inputDate: Date): string {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();
    
    return `${month}/${day}/${year}`;
}
  
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const shortDaysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
const shortMonthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function pickUpDateFormat(inputDate: string): string {
    const parsedDate = new Date(inputDate);
    const dayOfWeek = daysOfWeek[parsedDate.getDay()];
    const month = monthsOfYear[parsedDate.getMonth()];
    const date = parsedDate.getDate();

    return `${dayOfWeek}, ${month} ${date}`;
}


export function dayOfWeekFormat(inputDate: string): string {
    const parsedDate = new Date(inputDate);
    const dayOfWeek = daysOfWeek[parsedDate.getDay()];
    return `${dayOfWeek}`;
}

export function shortPickUpDateFormat(inputDate: string): string {
    const parsedDate = new Date(inputDate);
  
    const month = shortMonthsOfYear[parsedDate.getMonth()];
    const date = parsedDate.getDate();
    const year = parsedDate.getFullYear();

    return `${month} ${date}, ${year}`;
}