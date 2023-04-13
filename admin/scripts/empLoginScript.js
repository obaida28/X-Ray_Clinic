import { employeeLogin } from './functions.js'
import { getCookie, setCookie } from './utils.js'

window.onload = () => {
    if (getCookie('admin')) {
        window.open('/admin/appointments-current-hour.html', '_self')
    } else {
        var authedItems = Array.from(document.getElementsByClassName('authed'))
        authedItems.forEach(element => {
            element.style.display= 'none'
        });
    }
}

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = await employeeLogin(document.getElementById('number').value,
        document.getElementById('pass').value)
    if (data) {
        console.log(data.id)
        setCookie('admin', data.id, 7)
        if (data.type === 'doctor') {
            setCookie('doc', true, 7)
            
        }
        window.open('/admin/appointments-current-hour.html','_self')
    }
})