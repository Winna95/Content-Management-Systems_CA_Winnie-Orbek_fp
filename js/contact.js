import {isEmailValid, displayErrorMessageInHtmlElement,isPhoneNumberValid,
    isMessageLongEnough} from "./functions.js";


document.forms["contact-form"].onsubmit = function(event) {
    let isValid = true;
    const nameErrorHtmlElement = document.querySelector(".name-error")
    if(this.name.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            nameErrorHtmlElement, 
            "please enter your name"
        );
        isValid = false;
    } else {
        nameErrorHtmlElement.innerHTML = "";
    }
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
    const phoneErrorHtmlElement = document.querySelector(".phone-error")
    if(this.phone.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            phoneErrorHtmlElement,
            "please enter your phone number"
        );
        isValid = false
    } else if (!isPhoneNumberValid(this.phone.value)) {
        displayErrorMessageInHtmlElement(
            phoneErrorHtmlElement, "Please enter a valid phone number"
        );
        isValid = false
    } else {
        phoneErrorHtmlElement.innerHTML = ""
    }
    const messageErrorHtmlElement = document.querySelector(".message-error")
    if(this.message.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            messageErrorHtmlElement, 
            "please enter your message"
        ); 
        isValid = false
    } else if (!isMessageLongEnough(this.message.value)) {
        displayErrorMessageInHtmlElement(
            messageErrorHtmlElement, "The message must be at least 10 characters");
        isValid = false
    } else {
        messageErrorHtmlElement.innerHTML = ""
    }

    if(isValid) {
        const successHtmlElement = document.querySelector(".success");
        successHtmlElement.innerHTML = "Message successfully sent";
        successHtmlElement.style.display = "block";
        document.querySelector("#contact-form").reset(); 
        setTimeout(function() {
            document.querySelector(".success").style.display = "none";
            
        }, 3000);
         
    };
    event.preventDefault();

    return isValid;
    }
    
