//Function: check required field
function checkRequired(input, alert) {
    var result = true

    if (input.value === "") {
        console.log("Please enter " + input.id + ".")
        alert.innerHTML = "Please enter " + input.id + "."
        input.focus()
        result = false;
    } else {
        alert.innerHTML = ""
    }

    return result
}

//Function: validate email
function validateEmail(email, emailAlert) {
    var result = true

    var atPosition = email.value.indexOf("@");
    var dotPosition = email.value.lastIndexOf(".");

    if (atPosition < 1 || ( dotPosition - atPosition < 2 )) {
        console.log("Please enter a valid e-mail address.")
        emailAlert.innerHTML = "Please enter a valid e-mail address."
        email.focus()
        result = false;
    } else {
        emailAlert.innerHTML = ""
    }

    return result
}

//Function: validate password 
function validatePassword(password, passwordAlert) {
    var result = true

    var strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

    if (strongRegex.test(password.value)) {
        console.log("Please enter a valid e-mail address.")
        passwordAlert.innerHTML = "Please enter a valid e-mail address."
        password.focus()
        result = false;
    }else {
        passwordAlert.innerHTML = ""
    }

    return result
}

function validate() {
    var finalResult = true

    var firstname = document.getElementById("firstname")
    var lastname = document.getElementById("lastname")
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var confirmPassword = document.getElementById("confirmPassword")

    var alertFName = document.getElementById("alertFirstname")
    var alertLName = document.getElementById("alertLastname")
    var alertEmail = document.getElementById("alertEmail")
    var alertPassword = document.getElementById("alertPassword")
    var alertConfirmPassword = document.getElementById("alertConfirmPassword")

    //check required fields
    if (checkRequired(firstname, alertFName) === false) {
        finalResult = false
    }
    if (checkRequired(lastname, alertLName) === false) {
        finalResult = false
    } 
    if (checkRequired(email, alertEmail) === false) {
        finalResult = false
    } else if (validateEmail(email, alertEmail) === false) {
        finalResult = false
    }
    if (checkRequired(password, alertPassword) === false) {
        finalResult = false
    } else if (validatePassword(confirmPassword, alertConfirmPassword) === false) {
        //finalResult = false
    }
    if (checkRequired(confirmPassword, alertConfirmPassword) === false) {
        finalResult = false
    } else if (password.value !== confirmPassword.value) {
        alertConfirmPassword.innerHTML = "Password doesn't match"
        confirmPassword.focus()

        finalResult = false
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const registerBtn = document.getElementById("registerBtn")
    registerBtn.onclick = (event) => {
        validate()
    }
})