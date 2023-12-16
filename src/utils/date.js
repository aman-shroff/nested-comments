export function formatDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDay();
    const suffix = getNumberSuffix(day);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();
  
    return `${day}${suffix} ${month} ${year}`;
  }
  
  function getNumberSuffix(number) {
    if (number >= 11 && number <= 13) {
      return 'th';
    }
  
    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
}