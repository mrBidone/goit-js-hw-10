

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
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      
      if (userSelectedDate < Date.now()) {
        refs.startBtn.disabled = true;
        updateElementStyle(refs.startBtn, 'active-btn');
        
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
          updateElementStyle(refs.startBtn, 'active-btn');
        }; 
  },
};

function updateElementStyle(element, nameClass) {
  if (element.disabled) {
    element.classList.remove(nameClass);
  } else {
    element.classList.add(nameClass);
  }
}

function updateStyle() {
  updateElementStyle(refs.inputDate, 'active-input');
  updateElementStyle(refs.startBtn, 'active-btn');
}

const formatAsTwoDigits = (value => value.toString().padStart(2, "0"));

flatpickr(refs.inputDate, options);

let userSelectedDate;
let intervalId;

refs.startBtn.disabled = true;
refs.inputDate.disabled = false;
updateStyle();

refs.startBtn.addEventListener('click', () => {
    console.log('start');
    refs.startBtn.disabled = true;
    refs.inputDate.disabled = true;
    updateStyle();
    
  intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const time = convertMs(diff);
    refs.daysCounter.textContent = formatAsTwoDigits(time.days);
    refs.hoursCounter.textContent = formatAsTwoDigits(time.hours);
    refs.minCounter.textContent = formatAsTwoDigits(time.minutes);
    refs.secCounter.textContent = formatAsTwoDigits(time.seconds);
    if (diff <= 1000) {
      clearInterval(intervalId);
      refs.inputDate.disabled = false;
      updateStyle();
    }
  }, 1000);
});









