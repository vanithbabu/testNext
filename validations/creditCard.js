export function validateCreditCardNumber(cardNumber) {
    // Remove any spaces or non-digit characters
    cardNumber = cardNumber.replace(/\D/g, '');
  
    if (cardNumber.length !== 16) {
      return false; // Credit card number should be 12 digits
    }
  
    // Luhn algorithm
    let sum = 0;
    for (let i = 0; i < 16; i++) {
      let digit = parseInt(cardNumber[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
  
    return sum % 10 === 0;
  }
  
export function validateExpirationDate(expirationDate) {
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
  
    const inputMonth = parseInt(expirationDate.slice(0, 2));
    const inputYear = parseInt(expirationDate.slice(2));
  
    if (inputMonth < 1 || inputMonth > 12) {
      return false; // Month should be between 01 and 12
    }
  
    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      return false; // Expiration date should not be in the past
    }
  
    return true;
}
  