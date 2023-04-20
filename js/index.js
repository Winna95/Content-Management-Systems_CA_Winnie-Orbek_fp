import {isEmailValid, displayErrorMessageInHtmlElement} from "./functions.js";






document.forms["getUpdates-form"].onsubmit = function(event) {
    event.preventDefault();
    let isValid = true;
const emailErrorHtmlElement = document.querySelector(".email-error")
    if(this.email.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            emailErrorHtmlElement,
            "please enter your email address"
        );
        isValid = false
    } else if (!isEmailValid(this.email.value)) {
        displayErrorMessageInHtmlElement(
            emailErrorHtmlElement, "Please enter a valid email address"
        );
        isValid = false
    } else {
        emailErrorHtmlElement.innerHTML = ""
    }

    if(isValid) {
        const successHtmlElement = document.querySelector(".success");
        successHtmlElement.innerHTML = "Message successfully sent";
        successHtmlElement.style.display = "block";
        document.querySelector("#getUpdates-form").reset(); 
        setTimeout(function() {
            document.querySelector(".success").style.display = "none";
            
        }, 3000);
         
    };
    
    return isValid;
    }