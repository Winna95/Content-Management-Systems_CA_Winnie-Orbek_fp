import {isEmailValid, displayErrorMessageInHtmlElement,isPhoneNumberValid,
    isAddressLongEnough, isCardNumberRight, isCvvNumberRight, isMonthAndYearValid
    } from "./functions.js";



const totalSum = new URLSearchParams(document.location.search).get("totalSum");


    const totalSumElement = document.querySelector("#totalSum");
    totalSumElement.innerText = totalSum;
    const subtotalElement = document.querySelector("#subTotal");
    subtotalElement.innerText = totalSum;

document.forms["shipping-form"].onsubmit = function(event) {
    
    let isValid = true;
    const firstNameErrorHtmlElement = document.querySelector(".firstName-error")
    if(this.firstName.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            firstNameErrorHtmlElement, 
            "please enter your first name"
        );
        isValid = false;
    } else {
        firstNameErrorHtmlElement.innerHTML = "";
    }
    const lastNameErrorHtmlElement = document.querySelector(".lastName-error")
    if(this.lastName.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            lastNameErrorHtmlElement, 
            "please enter your last name"
        );
        isValid = false;
    } else {
        lastNameErrorHtmlElement.innerHTML = "";
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
    const addressErrorHtmlElement = document.querySelector(".address-error")
    if(this.address.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            addressErrorHtmlElement, 
            "please enter your address"
        ); 
        isValid = false
    } else if (!isAddressLongEnough(this.address.value)) {
        displayErrorMessageInHtmlElement(
            addressErrorHtmlElement, "The address must be at least 10 characters");
        isValid = false
    } else {
        addressErrorHtmlElement.innerHTML = ""
    }
    const cardNumberErrorHtmlElement = document.querySelector(".cardInfo-error")
    if(this.cardInfo.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            cardNumberErrorHtmlElement,
            "please enter your credit card number"
        );
        isValid = false
    } else if (!isCardNumberRight(this.cardInfo.value)) {
        displayErrorMessageInHtmlElement(
            cardNumberErrorHtmlElement, "Please enter a valid card number"
        );
        isValid = false
    } else {
        cardNumberErrorHtmlElement.innerHTML = ""
    }
    const cvvNumberErrorHtmlElement = document.querySelector(".cvv-error")
    if(this.cvv.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            cvvNumberErrorHtmlElement,
            "please enter your cvv number"
        );
        isValid = false
    } else if (!isCvvNumberRight(this.cvv.value)) {
        displayErrorMessageInHtmlElement(
            cvvNumberErrorHtmlElement, "Please enter a valid cvv number"
        );
        isValid = false
    } else {
        cvvNumberErrorHtmlElement.innerHTML = ""
    }
    const monthAndYearErrorHtmlElement = document.querySelector(".mmyy-error")
    if(this.mmyy.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            monthAndYearErrorHtmlElement,
            "please enter your cards MM/YY"
        );
        isValid = false
    } else if (!isMonthAndYearValid(this.mmyy.value)) {
        displayErrorMessageInHtmlElement(
            monthAndYearErrorHtmlElement, "Please enter a valid mm/yy"
        );
        isValid = false
    } else {
        monthAndYearErrorHtmlElement.innerHTML = ""
    }
     
    if(isValid) {
        const successHtmlElement = document.querySelector(".success");
        successHtmlElement.innerHTML = "Order success";
        successHtmlElement.style.display = "block";
        document.querySelector("#shipping-form").reset(); 
        setTimeout(function() {
            document.querySelector(".success").style.display = "none";
            
        }, 3000);
         
    } else {
        event.preventDefault();
    }
    

    return isValid;
    }