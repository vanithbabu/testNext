import NotificationManager from 'react-hot-toast';

export const Toast = ({ type = 'success', message, duration = 4000 }) => {
  if (Array.isArray(message)) {
    let item;

    for (item of message) {
      NotificationManager[type](item.message, { duration });
    }
  } else {
    NotificationManager[type](message, { duration });
  }
};


export const capitalizeFirstWord = (inputString) => {
  // Split the input string into words
  const words = inputString.split(' ');

  // Capitalize the first word
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }

  // Convert the rest of the words to lowercase
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }

  // Join the words back into a string
  return words.join(' ');
};
