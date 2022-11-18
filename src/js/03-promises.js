import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputDeleyStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  btnSubmit: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let delayNum = Number(delay.value);
  let stepNum = Number(step.value);
  
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayNum + i * stepNum)
      .then(onSuccess)
      .catch(onError);
  }
  e.target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
