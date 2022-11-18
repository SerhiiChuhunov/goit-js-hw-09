import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.classList.add('button');
refs.input.classList.add('input');
refs.button.setAttribute('disabled', true);

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }
    
    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const deltaTime = new Date(refs.input.value) - new Date();
            const time = this.convertMs(deltaTime);
            this.onTick(time);
        }, 1000);
    }
    
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        Notiflix.Report.success(
            'Super-Duper countdown timer',
            'Sale has started!!! Hurry or be late!',
            'Done!'
            );
    }
    
    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
        
        return { days, hours, minutes, seconds };
    }
    
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
    }; 
    
const timer = new Timer({onTick: updateClock});
    
refs.button.addEventListener('click', timer.start.bind(timer));
    
function updateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
  if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
    timer.stop();
  }
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
        onClose(selectedDates) {
            if (selectedDates[0] < Date.now()) {
                Notiflix.Notify.warning('Please choose a date in the future');
                return;
            }
            refs.button.removeAttribute('disabled');
        },
};

flatpickr(refs.input, options);