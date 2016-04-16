

var hint = {

    showHint: function (element) {
        
        var hintData = this.getHintData(element.name);
        if (hintData != false) {

            var divElement = document.createElement("div");
            divElement.className = 'helpField';

            divElement.textContent = hintData[0];
            divElement.style.top = hintData[1];
            divElement.style.left = hintData[2];

            element.parentElement.appendChild(divElement);
        }
    },

    getHintData: function (elementName) {
        switch (elementName) {
            case 'firstName':
                return ['Any symbol is allowed to use', '8px', '-300px'];
                break;
            case 'lastName':
                return ['Any symbol is allowed to use', '8px', '-470px'];
                break;
            case 'nickName':
                return ['Latin letters, numbers and dots are allowed to use', '100px', '-290px'];
                break;
            case 'password1':
                return ['Password must meet the following criteria: 1) contain at least 8 characters; 2) contain at least 1 number; 3) contain at least 1 lowercase character (a-z); 4) contain at least 1 uppercase character (A-Z); 5) contains only 0-9a-zA-Z', '125px', '-290px'];
                break;
            case 'phone':
                return ['Your phone number will help us to keep your account security', '380px', '-290px'];
                break;
            case 'email2':
                return ['Your second email address will help us to keep your account security', '430px', '-290px'];
                break;
            default:
                return false;
        }
    },

    hideHint: function (element) {
        var elementToDelete = element.parentElement.getElementsByClassName('helpField')[0]
        if (elementToDelete !== undefined) {
            element.parentElement.removeChild(elementToDelete);
        }
    }
}


//----------------------------------------------------------------------------------------


var warning = {

    showWarning: function (element) {
        var warningData = this.getWarningData(element.name);
        if (warningData != false) {

            var divElement = document.createElement("div");
            divElement.className = 'warningField';

            divElement.textContent = warningData[0];
            divElement.style.top = warningData[1];
            divElement.style.right = warningData[2];

            element.parentElement.appendChild(divElement);
            element.style.border = "1px solid red";
        }
    },

    getWarningData: function (elementName) {
        switch (elementName) {
            case 'firstName':
                return ['This box must be filled!', '0px', '-395px'];
            case 'lastName':
                return ['This box must be filled!', '0px', '-225px'];
            case 'nickName':
                return ['This box must be filled!', '100px', '-220px'];
            case 'password1':
                return ['This box must be filled!', '155px', '-220px'];
            default:
                return false;
        }
    },

    hideWarning: function (element) {
        var elementToDelete = element.parentElement.getElementsByClassName('warningField')[0]
        if (elementToDelete !== undefined) {
            element.style.border = "1px solid #FFF9F3";
            element.parentElement.removeChild(elementToDelete);
        }
    },

    verifyValue: function (element) {
        var valueToVerify = element.value;
        switch(element.name){
            case 'nickName':
                if (valueToVerify.split("@").length == 1) {
                    element.value = valueToVerify.trim() + "@gmail.com";
                    var valueToVerify = element.value;
                }
                return this.examenEmail(valueToVerify);
            case 'password1':
                return this.examenPassword(valueToVerify);
            case 'password2':
                if (valueToVerify === document.registration.password1.value) {
                    return true;
                }
                return false;
            case 'phone':
                if (valueToVerify.trim() === "" || valueToVerify.trim() === "+380") {
                    return true;
                }
                return this.examenPhone(valueToVerify);
            case 'email2':
                return this.examenEmail(valueToVerify);
            case 'birthDay':
                if (+valueToVerify <= 31 && +valueToVerify >= 1) {
                    return true;
                }
                return false;;
            case 'birthYear':
                if (+valueToVerify <= new Date().getFullYear() && +valueToVerify >= new Date().getFullYear() - 100) {
                    return true;
                }
                return false;;
            case 'treaty':
                return element.checked;
            case 'button':
                return true;
        }


    },

    showCaveat: function (element) {
        
        var caveatData = this.getCaveatData(element.name);
        if (caveatData != false) {

            var divElement = document.createElement("div");
            divElement.className = 'warningField';

            divElement.textContent = caveatData[0];
            divElement.style.top = caveatData[1];
            divElement.style.right = caveatData[2];
            divElement.style.width = caveatData[3];

            element.parentElement.appendChild(divElement);
            element.style.border = "1px solid red";
        }
    },

    getCaveatData: function (elementName) {

        switch (elementName) {
            case 'nickName':
                return ['Email address is not valid', '100px', '-235px', 'auto'];
            case 'password1':
                return ['Password is not valid', '155px', '-205px', 'auto'];
            case 'password2':
                return ['The passwords are not equal', '210px', '-255px', 'auto'];
            case 'phone':
                return ['Mobile phone number is not valid', '380px', '-280px', 'auto'];
            case 'email2':
                return ['Email address is not valid', '435px', '-230px', 'auto'];
            case 'birthDay':
                return ['Your birth day is not valid', '3px', '-465px', 'auto'];
            case 'birthYear':
                return ['Your birth year is not valid', '3px', '-245px', 'auto'];
            case 'treaty':
                return ['You should agree with this treaty in order to create an  account', '-10px', '-600px', '300px'];
            case 'button':
                return ['This form is not valid', '10px', '-600px', '300px'];
            default:
                return false;
        }
    },

    examenEmail: function (valueToVerify) {
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(valueToVerify);
    },

    examenPassword: function (valueToVerify) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(valueToVerify);
    },

    examenPhone: function (valueToVerify) {
        return /^(\+|\d)[0-9]{7,16}$/.test(valueToVerify);
    }
}


//-----------------------------------------------------------------------------------------


var firstNameBox = document.registration.firstName;
firstNameBox.addEventListener("focus", onfocus);
firstNameBox.addEventListener("blur", onblur);

var lastNameBox = document.registration.lastName;
lastNameBox.addEventListener("focus", onfocus);
lastNameBox.addEventListener("blur", onblur);

var nickNameBox = document.registration.nickName;
nickNameBox.addEventListener("focus", onfocus);
nickNameBox.addEventListener("blur", onblur);

var passwordBox1 = document.registration.password1;
passwordBox1.addEventListener("focus", onfocus);
passwordBox1.addEventListener("blur", onblur);
passwordBox1.addEventListener("change", onchangePassword);

var passwordBox2 = document.registration.password2;
passwordBox2.addEventListener("focus", onfocus);
passwordBox2.addEventListener("blur", onblur);

var phoneBox = document.registration.phone;
phoneBox.addEventListener("blur", onblur);
phoneBox.addEventListener("focus", onfocus);

var email2Box = document.registration.email2;
email2Box.addEventListener("blur", onblur);
email2Box.addEventListener("focus", onfocus);

var birthDayBox = document.registration.birthDay;
birthDayBox.addEventListener("blur", onblur);
birthDayBox.addEventListener("focus", onfocus);

var birthYearBox = document.registration.birthYear;
birthYearBox.addEventListener("blur", onblur);
birthYearBox.addEventListener("focus", onfocus);

var treatyBox = document.registration.treaty;
treatyBox.addEventListener("change", onchangeTreaty);


//---------------------------------------------------------------------------------------


function onfocus(e) {
    hint.showHint(e.target);
    warning.hideWarning(e.target);
}



function onblur(e) {

    hint.hideHint(e.target);

    if (e.target.value.trim() === "") {

        warning.showWarning(e.target);
    }
    else if (warning.verifyValue(e.target) == false) {

        warning.showCaveat(e.target);
    }
}



function onchangePassword(e) {
    document.registration.password2.value = "";
}



function onchangeTreaty(e) {
    
    if (warning.verifyValue(e.target) == false) {

        warning.showCaveat(e.target);
    }
    else {
        warning.hideWarning(e.target);
    }
}


//---------------------------------------------------------------------------------------


function validateForm() {

    if (document.registration.firstName.value.trim() == "") {
        alert("First name box is empty");
        return false;
    }
    if (document.registration.lastName.value.trim() == "") {
        alert("Last name box is empty");
        return false;
    }
    if (document.registration.password1.value != document.registration.password2.value) {
        alert("The passwords are not equal");
        return false;
    }    
    if (warning.examenEmail(document.registration.nickName.value) == false) {
        alert("The email address is not valid");
        return false;
    }
    if (warning.examenEmail(document.registration.email2.value) == false) {
        alert("The second email address is not valid");
        return false;
    }
    if (warning.examenPassword(document.registration.password1.value) == false) {
        alert("The password is not valid");
        return false;
    }
    if (warning.examenPhone(document.registration.phone.value) == false) {
        alert("The mobile phone is not valid");
        return false;
    }
    if (document.registration.treaty.checked == false) {
        alert("Treaty is not checked");
        return false;
    }
}