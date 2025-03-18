# Assessment Decisions and Reasoning

## Use of PNG instead of SVG on Background
**Problem**: Exporting the SVG from Figma was generating a file with a file size of 4.82mb. This is a huge file size for a background image.

**Solution**: I exported the image as a PNG and used it as a background image. The file size was reduced to 473kb.

**WebP**: I also exported the image as a WebP and used it as a background image if the browser supports it. The file size was reduced to 96kb.

## Retina Support using WebP
**Problem**: Background image in PNG format was 1.5mb in size. This is a huge file size for a background image.

**Solution**: I exported the image as a WebP and used it as a background image. The file size was reduced to 255kb. (Also verifying if the browser supports WebP)

## Image Compression
I use https://squoosh.app/ to compress the images. The images are compressed to the maximum without losing quality.

## Favicon
No favicon was provided in the design. I used the favicon from the website.

## Modular Code
I've divided the code into different files for better readability and maintainability, using modules in JavaScript.

📁js
- 📄 main.js
- 📄 constanst.js
- 📄 form-submission.js
- 📄 phone-mask.js

## JSDOC Comments
I've added JSDOC comments to the JavaScript files for better documentation.

## Form Validation

**Phone Input**

**Mask**: I've create the mask for the phone input with the format `(XXX) XXX-XXXX` using substring.

**Problem**: The mask was not working properly when the user was deleting the input. The user could get stuck in the mask simbols `(`, `)`, `-`.

**Solution**: I've added a condition to check if the user is deleting by verifiying the inputType of the event. If the inputType is `deleteContentBackward` or `deleteContentForward` the user was pressing the delete key or backspace key, so I add a variable `isDeleting` to check if the user is deleting and if the value dosn't match the mask simbols the mask is applied again.

**Improvement UX**: If the user get out of the phone input (blur) and the value is less that `validPhoneLength` the class `invalid` is added to the input.

I've added a function to validate the form `validateForm` that checks if the inputs are valid.

The inputs have the corresponding attributes `required` and `type=` to help the browser to validate the form.

**Submit**

I've separated the logic and created functions and an state to handle the form submission.

Function `disableForm`: Disable the form inputs and change the button text to "Submitted".

Fuction `handleFormSubmit`: handles form submission using AJAX or Fetch API, and allows sending data in JSON or FormData format.

`useFormSubmitted`: It is similar to a simple hook to handle whether the form has been submitted.

After the form is submitted the **eventListeners** are removed.

## What took the most time

What took me the most time was reviewing and refining the code in general, including the HTML, CSS and JavaScript, as well as iterating on the loading of the images and checking everything several times.

I verified page performance using Lighthouse to optimize loading speed and user experience.

## What was tricky?

The most complicated thing was implementing the phone mask, specifically when handling number editing. In my first implementation, the cursor got stuck on the symbols (, ) and -. To solve this, I investigated how to detect if the user was deleting characters (using events like deleteContentBackward) and adjusted the mask logic. 

And also research on how to use AJAX for form submission, as I haven't implemented it for a long time.

## Final thoughts

The UX can be improved by adding messages to the user below the input when the input is invalid. This would help the user to understand what is wrong, at the moment the only indication is the border color of the input have changed to red ( #D50303).

I've added console.error messages when validation fails for debugging purposes.


## General requirements:
- [x] pixel perfect (on given breakpoints).
- [x] cross-browser support (desktop and mobile).
- [x] responsive design according to provided mockups (you can use 767px as a mobile breakpoint).
- [x] retina support.
- [x] any copy on the page can be changed (in the source file) and it should NOT break the page.
- [x] background color should transition from #ECF8FB to #EFEFEF continuously with 5 sec duration: it takes 5 sec to change the color from #ECF8FB to #EFEFEF, then 5 sec from #EFEFEF to #ECF8FB, and so on.
- [x] the page should be optimized for max performance and fast loading.
- [x] "Read more" link in the bottom opens google.com in a new window

## Form requirements:

- [x] phone field should have a mask for US phone number: (XXX) XXX-XXXX
- [x] the form should be optimized for mobile UX (do your best).
- [x] add form validation:
  - [x] Name" field requires 2 or more chars.
  - [x] "City" and "State" are optional
  - [x] "Phone" field is required and should have validation by mask.
  - [x] "Email" field is required.
  - [x] if there's an error, the field should change the border color to #D50303.
  - [x] the form should submit data to https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar via ajax (ignore any errors).
  - [x] after successful submission, change the button copy to "Submitted" and do not allow any more submissions.