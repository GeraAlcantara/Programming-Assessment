import { errorClass, minCharName, postFormUrl, validPhoneLength } from "./constants.js";
import { handleFormSubmit, useFormSubmitted } from "./form-submission.js";
import { applyPhoneMask } from "./phoneMask.js";


document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('name')
  const phoneInput = document.getElementById('phone')
  const emailInput = document.getElementById('email')
  const form = document.querySelector('form')
  const [formSubmitted, setFormSubmitted] = useFormSubmitted(false)

  /* I alway check if the element is not null and is the expected type */
  if (nameInput === null || !(nameInput instanceof HTMLInputElement) || phoneInput === null || !(phoneInput instanceof HTMLInputElement) || emailInput === null || !(emailInput instanceof HTMLInputElement) || form === null) {
    console.error('input not found or not expected type');
    return
  }

  /* phone mask and validate on blur input */
  const { handleBlur, handleInput } = applyPhoneMask(phoneInput)

  /* validate on blur input */
  nameInput.addEventListener('blur', function (e) {
    const target = e.target
    if (target instanceof HTMLInputElement) {

      target.value.trim().length < minCharName ? target.classList.add(errorClass) : target.classList.remove(errorClass)
    }
  })

  /**
   * Submit form handler
   * @param {SubmitEvent} e 
   * @returns {void} side effect: set formSubmitted to true
   */
  const submitForm = function (e) {
    e.preventDefault();
    /* Validation of requiere inputs */
    if (!validateForm(nameInput, phoneInput, emailInput)) {
      console.error('Error Validation');
      return;
    }
    handleFormSubmit(form, postFormUrl);
    setFormSubmitted(true)

  };

  form.addEventListener('submit', submitForm)

  if (formSubmitted()) {
    /* Remove listeners */
    form.removeEventListener('submit', submitForm)
    phoneInput.removeEventListener('input', handleInput);
    phoneInput.removeEventListener('blur', handleBlur);
  }

})

/**
 * Form Validation
 * @param {HTMLInputElement} nameInput 
 * @param {HTMLInputElement} phoneInput
 * @param {HTMLInputElement} emailInput
 * @returns {boolean} true if all inputs are valid
 */
function validateForm(nameInput, phoneInput, emailInput) {
  const name = nameInput.value.trim();
  const phoneNumber = phoneInput.value.replace(/\D/g, '');
  if (phoneNumber.length < validPhoneLength) {
    phoneInput.classList.add(errorClass)
    console.error('phone error');

    return false
  }
  if (name.length < minCharName) {
    nameInput.classList.add(errorClass)
    console.error('name error');

    return false
  }
  if (!emailInput.value.includes('@')) {
    emailInput.classList.add(errorClass)
    console.error('email error');

    return false
  }

  return true
}