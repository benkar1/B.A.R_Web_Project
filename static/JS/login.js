

/*
page variables
 */
const loginForm = document.querySelector(".login-form");
const createAccountForm = document.querySelector(".signup-form");

const inputs = createAccountForm.querySelectorAll('.form-input');
const smalls = createAccountForm.querySelectorAll('small');

let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let username = document.getElementById('username');
let password = document.getElementById('password');
let cpassword = document.getElementById('cpassword');


/*
    sign up validation
 */
const validate = () => {
    const firstnameVal = firstname.value.trim();
    const lastnameVal = lastname.value.trim();
    const usernameVal = username.value;
    const passwordVal = password.value;
    const cpasswordVal = cpassword.value;

    let success = 0;

    //first name validation
    if(firstnameVal === ""){
        setErrorMsg(firstname, 'must enter first name');
    }else if(firstnameVal.length < 2 || !(/^[A-z ]+$/.test(firstnameVal))){
        setErrorMsg(firstname, 'wrong first name');
    }else{
        success +=1;
        setSuccessMsg(firstname);
    }

    //last name validation
    if(lastnameVal === ""){
        setErrorMsg(lastname, 'must enter last name');
    }else if(lastnameVal.length < 2 ||  !(/^[A-z ]+$/.test(lastnameVal))){
        setErrorMsg(lastname, 'wrong last name');
    }else{
        setSuccessMsg(lastname);
        success +=1;
    }

    //user name validation
    if(usernameVal.length < 6){
        setErrorMsg(username, 'can not  be less than 6 characters');
    }else{
        setSuccessMsg(username);
        success +=1;
    }

    //password validation
    if(passwordVal.length < 6){
        setErrorMsg(password, 'can not  be less than 6 characters');
    }else{
        setSuccessMsg(password);
         success +=1;
    }

    //confirm password validation
    if(cpasswordVal === passwordVal){
        success +=1;
        setSuccessMsg(cpassword);
    } else{
        setErrorMsg(cpassword, 'passwords dont match');
    }
    if (success === inputs.length){
        alert("User Created Successfully");
        return true;
    }
    return false;
}

//error message
const setErrorMsg = (input, errormsgs) => {
    const form = input.parentElement;
    const small = form.querySelector('small');
    form.classList.add("error");
    small.innerText = errormsgs;
    small.style.visibility = 'visible';
}

//success message
const setSuccessMsg = (input) => {
    const form = input.parentElement;
    form.classList.add("success");
}


/*
    delete all cookies + jump between forms
 */
 document.addEventListener("DOMContentLoaded", () =>{
     let Cookies = document.cookie.split(';');
     createAccountForm.classList.add("hide");

     // set 1 Jan, 1970 expiry for every cookies
     for (var i = 0; i < Cookies.length; i++) {
         document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
     }
     const nav_link = document.querySelector('.dropdown');
     nav_link.style.display = 'none';
     
     //display sign up form
     document.querySelector("#linkCreateAccount").addEventListener("click", e =>{
         e.preventDefault();
         loginForm.classList.add("hide");
         createAccountForm.classList.remove("hide");

         //reset inputs
         smalls.forEach(small=>{small.style.visibility = 'hidden'});
         for (let i =0; i<inputs.length; i++){
             inputs[i].classList.remove("error");
             inputs[i].classList.remove("success");
         }
     });

     //display login form
    document.querySelector("#linkLogin").addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.remove("hide");
        loginForm.reset();
        createAccountForm.classList.add("hide");
    });

 });

