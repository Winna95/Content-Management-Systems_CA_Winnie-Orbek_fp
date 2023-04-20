//Function to check if email is valid
function isEmailValid(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}



// Function to display the error message
function displayErrorMessageInHtmlElement(htmlElement, errorMessage) {
    htmlElement.innerHTML = errorMessage;
    htmlElement.style.display = "block";

}
//Function to check it phone number is valid
function isPhoneNumberValid(phone) {
    const regExPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const patternMatches = regExPhone.test(phone);
    return patternMatches;
    }
    
    //Function to check if the message is long enough
    function isMessageLongEnough (message) {
        if(message.length < 10) {
            
            return false
            
        }
          return true
    }
    //Function to check if the address is long enough
function isAddressLongEnough (address) {
    if(address.length < 10) {
        
        return false
        
    }
      return true
}
//Function to check if card information is right
function isCardNumberRight (cardInfo) {
    const regExCard = /^\d{16}$/;
    const patternMatches = regExCard.test(cardInfo);
    return patternMatches;
}
//Function to check if cvv code is right
function isCvvNumberRight (cvv) {
    const regExCvv = /^[0-9]{3,4}$/;
    const patternMatches = regExCvv.test(cvv);
    return patternMatches;
}

//Function is mm/yy valid

function isMonthAndYearValid (mmyy) {
    const regExMonthAndYear = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const patternMatches =regExMonthAndYear.test(mmyy);
    return patternMatches;
}

export {
    isEmailValid,
    displayErrorMessageInHtmlElement,
    isPhoneNumberValid,
    isMessageLongEnough,
    isAddressLongEnough,
    isCardNumberRight,
    isCvvNumberRight,
    isMonthAndYearValid
};