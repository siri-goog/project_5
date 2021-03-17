var email = document.getElementById("email")
var password = document.getElementById("password")

var alertEmail = document.getElementById("alertEmail")
var alertPassword = document.getElementById("alertPassword")

//Function: check required field
function checkRequired(input, alert) {
    var result = true

    if (input.value === "") {
        console.log("Please enter your " + input.id + ".")
        alert.innerHTML = "Please enter your " + input.id + "."
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
//Function: login
function validate() {
    var finalResult = true

    //check required fields 
    if (checkRequired(email, alertEmail) === false) {
        finalResult = false
    } else if (validateEmail(email, alertEmail) === false) {
        finalResult = false
    }
    if (checkRequired(password, alertPassword) === false) {
        finalResult = false
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn")
    loginBtn.onclick = (event) => {
        validate()
    }

    const cancelBtn = document.getElementById("cancelBtn")
    cancelBtn.onclick = (event) => {
        document.getElementById('email').value = ""
        document.getElementById('password').value = ""
    }
})