import { patientLogin } from './functions.js'


const form = document.getElementById('login-form')
const num = document.getElementById('num')
const pass = document.getElementById('pass')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    patientLogin(num.value,pass.value)
})
