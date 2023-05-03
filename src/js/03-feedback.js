import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector(`.feedback-form`),
  email: document.querySelector(`[name="email"]`),
  feedback: document.querySelector(`[name="message"]`),
};
const storageKey = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

fillFormFids();

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  if (email.value === '' || message.value === '') {
    window.alert('Усі поля повинні бути заповненні');
    return;
  }
  const data = { email: email.value, message: message.value };
  console.log(data);
  e.currentTarget.reset();
  localStorage.removeItem(storageKey);
}

function onFormInput(e) {
  let feedbackFormData = localStorage.getItem(storageKey);
  if (feedbackFormData) {
    feedbackFormData = JSON.parse(feedbackFormData);
  } else {
    feedbackFormData = {};  
  }
  feedbackFormData[e.target.name] = e.target.value;
  localStorage.setItem(storageKey, JSON.stringify(feedbackFormData));
}

function fillFormFids() {
  const saveFormData = localStorage.getItem(storageKey);
  if (saveFormData) {
    const parsedFormData = JSON.parse(saveFormData);
    refs.email.value = parsedFormData.email ? parsedFormData.email : '';
    refs.feedback.value = parsedFormData.message ? parsedFormData.message : '';
  }
}
