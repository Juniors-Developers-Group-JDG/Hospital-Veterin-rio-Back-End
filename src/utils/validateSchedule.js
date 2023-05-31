import moment from 'moment';

export default function validateSchedule(arr, startTime) {
  // "2023-05-24T14:30:00.000Z"
  let isValid = true;
  arr.forEach((element) => {
    if (moment(element.startTime).isSame(startTime)) {
      isValid = false;
    } else if (moment(startTime).isBetween(element.startTime, element.closingTime)) {
      isValid = false;
    } else {
      isValid = true;
    }
  });
  return (isValid);
}
