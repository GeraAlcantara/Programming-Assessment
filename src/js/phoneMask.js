import { errorClass, validPhoneLength, } from "./constants.js";

/**
 * Apply phone mask (XXX) XXX-XXXX
 * @param {HTMLInputElement} input - Input element that will receive the mask
 * @returns {{ handleInput: (e: Event) => void, handleBlur: (e: Event) => void }} Object with listeners to be able to remove it after form submit
 */
export function applyPhoneMask(input) {
  /**
   * handle input event to apply mask
   * @param {Event} e 
   */
  const handleInput = function (e) {
    const target = e.target
    if (target instanceof HTMLInputElement) {
      let phoneNumber = target.value.replace(/\D/g, '');
      let currentValue = target.value;
      /* prevent bug get stock deleting simbols */
      const isDeleting = (e instanceof InputEvent) && (e.inputType === "deleteContentBackward" || e.inputType === "deleteContentForward");

      if (phoneNumber.length > 0) {
        /* substring indexes area code format (012) 345-6789 */
        phoneNumber = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6, 10);
      }
      if (isDeleting) {
        // if user is deleting 
        if (!/[() -]/.test(currentValue)) {
          target.value = phoneNumber;
        }
      } else {
        target.value = phoneNumber;
      }
    }

  }
  const handleBlur = function (e) {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const phoneNumber = target.value.replace(/\D/g, '');
      phoneNumber.length < validPhoneLength ? target.classList.add(errorClass) : target.classList.remove(errorClass)
    }
  }
  input.addEventListener('input', handleInput)
  input.addEventListener('blur', handleBlur)
  /* return function to remove listener after submit */
  return { handleInput, handleBlur }
}




