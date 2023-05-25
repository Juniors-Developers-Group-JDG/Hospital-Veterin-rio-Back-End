import moment from 'moment';

export default function validateSchedule(arr, startTime, isFull) {
  if (isFull >= 5) return;
  // "2023-05-24T14:30:00.000Z"
  let isValid = true;
  arr.forEach((element) => {
    console.log(moment(startTime).isBetween(element.startTime, element.closingTime));
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
