import { employeeSignUp} from './functions.js'
import { getCookie } from './utils.js'
var name = document.getElementById('name')
var email = document.getElementById('email')
var phone = document.getElementById('phone')
var image = document.getElementById('image')
var pass1 = document.getElementById('pass1')
var pass2 = document.getElementById('pass2')
var startH = document.getElementById('startH')
var endH = document.getElementById('endH')
var address = document.getElementById('address')

window.onload =() => {
    if (!getCookie('doc')) {
        window.open('/admin/appointments-current-hour.html', '_self')
    } else {
        var authedItems = Array.from(document.getElementsByClassName('not-authed'))
        authedItems.forEach(element => {
            element.style.display= 'none'
        });
    }
}

document.getElementById('form').onsubmit = async (e) => {
    e.preventDefault()
    const data = await employeeSignUp(name.value, pass1.value, pass2.value, phone.value,
        address.value, startH.value, endH.value, email.value, image.files[0] ? image.files[0] : '')
    if (data) {
        window.open('/admin/expert-login.html','_self')
    }
}