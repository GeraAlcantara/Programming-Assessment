/**
 * Disable Form btns and inputs (soft)
 * @param {HTMLFormElement} form 
 */
function disableForm(form) {
  const submitButton = form.querySelector('.form__btn')
  if (submitButton === null || !(submitButton instanceof HTMLButtonElement)) {
    console.error('Button not found');
    return
  }
  /* ignoring any error */
  submitButton.textContent = 'Submitted'
  submitButton.disabled = true
  // disable all inputs in the form 
  const inputs = form.querySelectorAll('input')
  inputs.forEach(input => input.disabled = true)
}
/**
 * Handle form submission with AJAX or Fetch API
 * @param {HTMLFormElement} form 
 * @param {string} postFormUrl 
 * @param {'Fetch' | 'AJAX'} [submitMethod]
 * @default 'AJAX'
 * @param {'JSON' | 'FormData'} [dataFormat]
 * @default 'FormData'
 */
function handleFormSubmit(form, postFormUrl, submitMethod = 'AJAX', dataFormat = 'FormData') {
  if (!(form instanceof HTMLFormElement)) {
    throw new Error('form Element is required');
  }
  if (postFormUrl === undefined || !postFormUrl.trim() || typeof postFormUrl !== 'string') {
    throw new Error('postFormUrl is required');
  }
  if (submitMethod !== 'Fetch' && submitMethod !== 'AJAX') {
    throw new Error('submitMethod must be Fetch or AJAX');
  }
  if (dataFormat !== 'JSON' && dataFormat !== 'FormData') {
    throw new Error('dataFormat must be JSON or FormData');
  }
  const formData = dataFormat === 'FormData' ? new FormData(form) : JSON.stringify(Object.fromEntries(new FormData(form)))

  if (submitMethod === 'AJAX') {

    const request = new XMLHttpRequest()
    request.open('POST', postFormUrl, true)
    if (dataFormat === 'JSON') {
      request.setRequestHeader('Content-Type', 'application/json')
    }
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        console.log('Response', request.responseText)
      }
    }
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        console.log('Form Send (ignoring errors)');
        console.log('Response', request.responseText)

      } else {
        console.error('Error sending form', request.statusText)
      }

    }
    request.send(formData)
  }
  if (submitMethod === 'Fetch') {
    fetch(postFormUrl, {
      method: 'POST',
      headers: dataFormat === 'JSON' ? { 'Content-Type': 'application/json' } : {},
      body: formData
    })
      .then(response => {
        console.log('Form Send (ignoring errors)');
        console.log('Response', response);
      })
      .catch(error => {
        console.error('Error sending form', error)
      })
  }
  disableForm(form)

}
/**
 * Form submitted State
 * @param {boolean} initialValue 
 * @returns {[() => boolean, (newState: boolean) => void]}
 */
function useFormSubmitted(initialValue) {
  if (typeof initialValue !== 'boolean') {
    throw new Error('initialValue must be a boolean');
  }
  let state = initialValue
  /**
   * @returns {boolean} The current state value
   */
  const getState = () => state

  /**
   * @param {boolean} newState 
   */
  const setState = (newState) => {
    if (typeof newState !== 'boolean') {
      throw new Error('newState must be a boolean');
    }
    state = newState
  }
  return [getState, setState]
}
export { handleFormSubmit, useFormSubmitted }
