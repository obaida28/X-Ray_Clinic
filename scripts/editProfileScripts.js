import {getPatientById,patientUpdate} from './APIs.js'
import { getCookie } from './utils.js';
const userName = document.getElementById('username');
const gender = document.getElementById('gender');
const birthdate =document.getElementById("date");
const address =document.getElementById('address');
const number =document.getElementById('number');
const email = document.getElementById('email');
const password =document.getElementById('password');
const confirmPasswrd = document.getElementById('confirm-passwrd');

// var input = document.getElementById('img')
// var img = document.getElementById('preview')
// input.addEventListener('change', function () {
//     removePreview.style.display = 'block'
//     img.style.display='block'
//     var url = URL.createObjectURL(input.files[0]);
//     img.src = url;
// })

window.onload = async () => {
    if (!getCookie('user')) {
        window.open('/index.html', '_self')
    } else {
        var data = await getPatientById(getCookie('user'))
        userName.value = data.name
        gender.value = data.gender
        email.value = data.email
        number.value = data.phone
        birthdate.value = data.birthdate.substr(0, 9)
        password.value = data.password
        address.value = data.address
    }
}

document.getElementById('editProfile-form').onsubmit = async (e) => {
    e.preventDefault()
    var data = await patientUpdate(
        getCookie('user'),
        userName.value,
        password.value,
        confirmPasswrd.value,
        number.value,
        address.value,
        gender.value,
        birthdate.value,
        email.value ? email.value : '',
        '',
        'notes'
    )
    if (data) {
      window.open('/my-profile.html','_self')
    }
}