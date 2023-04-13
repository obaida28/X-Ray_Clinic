import { patientLogin } from "./APIs.js";
import {getCookie, setCookie} from './utils.js'
const number =document.getElementById('phone-number');
const password =document.getElementById('password');
const form = document.getElementById('form');
const button = document.getElementById('button')

window.onload = () => {
   if (getCookie('user')) {
     window.open('/index.html','_self')
   }
}

form.addEventListener('submit', async function (e) {
   e.preventDefault();
   button.disabled = true
   button.innerText = 'Loading...'
   const data = await patientLogin(number.value, password.value);
   if (data && data.id) {
      setCookie('user',data.id,7)
      window.open('/index.html','_self')
   }
   button.disabled = false
   button.innerText = 'Login'
})