import moment from 'moment';

export default function validateSchedule(arr, startTime) {
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
//   const hours = arr.map((hour) => hour.startTime.toLocaleDateString());
//   const isExist = hours.includes(startTime.toLocaleDateString());
//   return isExist;
}
