import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    onWelcomeMessage();
  }, 1000);
});

formElem.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(formElem.delay.value);
  const state = formElem.state.value;

  if (delay <= 0 || delay === null) {
    onEmptyDelay();
  } else {
    createPromise(delay, state);
  }

  formElem.reset();
});

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  return promise.then(onFulfilled).catch(onRejected);
}

function onFulfilled(delay) {
  iziToast.success({
    position: 'topRight',
    title: 'Fulfilled',
    message: `promise in ${delay}ms`,
    messageColor: '#ffffff',
    backgroundColor: '#59A10D',
    titleColor: '#ffffff',
    iconColor: '#ffffff',
    theme: 'dark',
  });
}

function onRejected(delay) {
  iziToast.error({
    position: 'topRight',
    title: 'Rejected',
    message: ` promise in ${delay}ms`,
    messageColor: '#ffffff',
    backgroundColor: '#EF4040',
    titleColor: '#ffffff',
    iconColor: '#ffffff',
    theme: 'dark',
  });
}

function onEmptyDelay() {
  iziToast.warning({
    position: 'topRight',
    title: 'Caution',
    message: 'Please enter a number more than 0',
    messageColor: '#ffffff',
    backgroundColor: '#FFA000',
    titleColor: '#ffffff',
    iconColor: '#ffffff',
    theme: 'dark',
  });
}

function onWelcomeMessage() {
  iziToast.info({
    position: 'topRight',
    title: 'Hello',
    message: 'Welcome!',
    messageColor: '#ffffff',
    backgroundColor: '#0099FF',
    titleColor: '#ffffff',
    iconColor: '#ffffff',
    theme: 'dark',
  });
}
