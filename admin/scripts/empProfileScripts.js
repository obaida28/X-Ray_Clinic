import { updateEmployee, getEmployeeById } from './functions.js'
import {getCookie} from './utils.js'
var name = document.getElementById('name')
var email = document.getElementById('email')
var phone = document.getElementById('phone')
var pass1 = document.getElementById('pass1')
var pass2 = document.getElementById('pass2')
var address = document.getElementById('address')
var emp;
window.onload = async () => {
    if (!getCookie('admin')) {
        window.open('/index.html','_self')
    } else {
        var notAuthedItems = Array.from(document.getElementsByClassName('not-authed'))
        notAuthedItems.forEach(element => {
            element.style.display ='none'
        })
        emp = await getEmployeeById(getCookie('admin'))
        if (emp && emp.state !== "active") {
            document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.open('/index.html','_self')
        }
        name.value = emp.name
        address.value = emp.address
        phone.value = emp.phone
        pass1.value = emp.password
        email.value = emp.email 
        if (!getCookie('doc')) {
            var docItems = Array.from(document.getElementsByClassName('doc-auth'))
        docItems.forEach(element => {
            element.style.display ='none'
        })
        }
    }
    
}

document.getElementById('form').onsubmit = async (e) => {
    e.preventDefault()
    const data = await updateEmployee(getCookie('admin'),name.value, pass1.value, pass2.value, phone.value,
        address.value, emp.start_time, emp.end_time, email.value, '' ,'')
    if (data) {
        alert('Success!')
    }
}