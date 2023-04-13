import {patientSignUp} from "./functions.js"
import { getCookie } from './utils.js';
const userName =document.getElementById('username');
const gender = document.getElementById('gender');
const birthdate =document.getElementById("date");
const address =document.getElementById('address');
const number =document.getElementById('number');
const email = document.getElementById('email');
const password =document.getElementById('password');
const confirmPasswrd = document.getElementById('confirm-passwrd');
const removePreview = document.getElementById("closeBTN")
const button = document.getElementById('button')


var input = document.getElementById('img')
var img = document.getElementById('preview')
input.addEventListener('change', function () {
    removePreview.style.display = 'block'
    img.style.display='block'
    var url = URL.createObjectURL(input.files[0]);
    img.src = url;
})


var form = document.getElementById('signup-form')


form.addEventListener('submit',async function(e){
    e.preventDefault();
    button.disabled = true;
    button.innerText ='Loading...'
    console.log(userName.value, password.value, confirmPasswrd.value ,number.value ,address.value ,
        gender.value, birthdate.value, email.value? email.value:'' ,input.files[0] ? input.files[0] : ''  , 'note' )
    const data = await patientSignUp(userName.value, password.value, confirmPasswrd.value ,number.value ,address.value ,
        gender.value, birthdate.value, email.value? email.value:'' ,input.files[0] ? input.files[0] : ''  , 'note' )
    if (data) {
        window.close()
    } 
    button.disabled = false;
    button.innerText ='Register'
})


const removePreviewFun = () => {
    img.src = 'null'
    img.style.display = 'none'
    removePreview.style.display='none'
    input.value= ''
}

removePreview.addEventListener('click',removePreviewFun)





