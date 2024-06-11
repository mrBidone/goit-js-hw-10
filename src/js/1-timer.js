

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imageUrl from '../img/Error-icon.svg';
const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    timerContainer: document.querySelector('.timer'),
    daysCounter: document.querySelector('[data-days]'),
    hoursCounter: document.querySelector('[data-hours]'),
    minCounter: document.querySelector('[data-minutes]'),
    secCounter: document.querySelector('[data-seconds]')
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
  return { days, hours, minutes, seconds };
}

refs.startBtn.disabled = true;

let userSelectedDate;
let currentDate = Date.now();
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      
      if (userSelectedDate < currentDate) {
          refs.startBtn.disabled = true;
          iziToast.show({
              title: 'Error',
              titleSize: '16px',
              titleLineHeight: '1.5',
              titleColor: '#FFFFFF',
                message: "Please choose a date in the future",
              messageSize: '16px',
                messageLineHeight: '1.5',
                backgroundColor: '#EF4040',
                messageColor: '#FFFFFF',
              iconUrl: imageUrl,
              position: 'topRight',
              progressBarColor: '#B51B1B',
            theme: 'dark'
});
      } else {
          refs.startBtn.disabled = false;
      }; 
  },
};



flatpickr(refs.inputDate, options);

refs.startBtn.addEventListener('click', () => {
    console.log('start');
    refs.startBtn.disabled = true;
    refs.inputDate.disabled = true;
    intervalId = setInterval(() => {
        const diff = userSelectedDate - Date.now();
        const time = convertMs(diff);
        refs.daysCounter.textContent = formatAsTwoDigits(time.days);
        refs.hoursCounter.textContent = formatAsTwoDigits(time.hours);
        refs.minCounter.textContent = formatAsTwoDigits(time.minutes);
        refs.secCounter.textContent = formatAsTwoDigits(time.seconds);
    }, 1000)

    setTimeout(() => {
    clearInterval(intervalId);
    refs.inputDate.disabled = false;
    }, userSelectedDate - Date.now());
    
});



const formatAsTwoDigits = (value => value.toString().padStart(2, "0"));



