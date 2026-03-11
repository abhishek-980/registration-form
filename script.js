const form = document.getElementById("form")

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const passwordInput = document.getElementById("password")

const strengthBar = document.getElementById("strengthBar")
const togglePassword = document.getElementById("togglePassword")

let submissions = JSON.parse(localStorage.getItem("submissions")) || []


nameInput.addEventListener("input",validateName)
emailInput.addEventListener("input",validateEmail)
phoneInput.addEventListener("input",validatePhone)
passwordInput.addEventListener("input",checkPasswordStrength)


function validateName(){

let name = nameInput.value
let error = document.getElementById("nameError")

if(name.length < 3){
error.innerText = "Name must be at least 3 characters"
return false
}

error.innerText = ""
return true

}


function validateEmail(){

let email = emailInput.value
let error = document.getElementById("emailError")

let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

if(!pattern.test(email)){
error.innerText = "Enter valid email"
return false
}

error.innerText = ""
return true

}


function validatePhone(){

let phone = phoneInput.value
let error = document.getElementById("phoneError")

if(phone.length != 10 || isNaN(phone)){
error.innerText = "Enter valid 10 digit phone"
return false
}

error.innerText = ""
return true

}


function checkPasswordStrength(){

let password = passwordInput.value
let strength = 0

if(password.length > 5) strength++
if(/[A-Z]/.test(password)) strength++
if(/[0-9]/.test(password)) strength++
if(/[@$!%*?&]/.test(password)) strength++

if(strength == 1){
strengthBar.style.width = "25%"
strengthBar.style.background = "red"
}

else if(strength == 2){
strengthBar.style.width = "50%"
strengthBar.style.background = "orange"
}

else if(strength == 3){
strengthBar.style.width = "75%"
strengthBar.style.background = "yellow"
}

else if(strength == 4){
strengthBar.style.width = "100%"
strengthBar.style.background = "green"
}

}


togglePassword.addEventListener("click",function(){

if(passwordInput.type === "password"){
passwordInput.type = "text"
togglePassword.innerText = "Hide"
}

else{
passwordInput.type = "password"
togglePassword.innerText = "Show"
}

})


form.addEventListener("submit",function(e){

e.preventDefault()

if(!validateName() || !validateEmail() || !validatePhone()){
return
}

let user = {

name:nameInput.value,
email:emailInput.value,
phone:phoneInput.value,
password:passwordInput.value

}

submissions.push(user)

localStorage.setItem("submissions",JSON.stringify(submissions))

alert("Registration Successful")

form.reset()
strengthBar.style.width="0%"

})