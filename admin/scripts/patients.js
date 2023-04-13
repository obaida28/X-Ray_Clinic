import { getAllPatients,getEmployeeById,getPatientByPhone, openSession} from './functions.js'
import { getCookie } from './utils.js'
const tbody = document.getElementById('tbody')
const phone = document.getElementById('input')


window.onload = async () => {
    if (!getCookie('admin')) {
        window.open('/index.html', '_self')
    } else {
        const data = await getEmployeeById(getCookie('admin'))
        if (data && data.state !== "active") {
            document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.open('/index.html','_self')
        }
        var notAuthedItems = Array.from(document.getElementsByClassName('not-authed'))
        notAuthedItems.forEach(element => {
            element.style.display ='none'
        });
        if (!getCookie('doc')) {
            var docItems = Array.from(document.getElementsByClassName('doc-auth'))
        docItems.forEach(element => {
            element.style.display ='none'
        })
        }
        const pateintsArr = await getAllPatients()
        pateintsArr.map((patient) => {
            const tr = document.createElement('tr')
            tr.classList.add("table-light")
            tbody.appendChild(tr)

            const nameTd = document.createElement('td')
            nameTd.innerText = patient.name
            tr.appendChild(nameTd)

            const phoneTd = document.createElement('td')
            phoneTd.innerText = patient.phone
            tr.appendChild(phoneTd)

            const actionsTd = document.createElement('td')
            const openBtn = document.createElement('button')
            openBtn.classList.add('btn', 'btn-success')
            openBtn.innerText = 'Open Session'
            openBtn.onclick = async () => {
                const data = await openSession(patient.id, getCookie('admin'), '',0)
                if (data) {
                    localStorage.setItem('se', data.sessionId)
                    window.open('/admin/current-session.html', '_self')
                }
            }
            actionsTd.appendChild(openBtn)
            tr.appendChild(actionsTd)

        })
    }
} 

document.getElementById('search').addEventListener('click',async()=>{
        tbody.innerHTML = ''
        const pateintsArr = await getPatientByPhone(phone.value.toString())
        pateintsArr.map((patient) => {
            const tr = document.createElement('tr')
            tr.classList.add("table-light")
            tbody.appendChild(tr)

            const nameTd = document.createElement('td')
            nameTd.innerText = patient.name
            tr.appendChild(nameTd)

            const phoneTd = document.createElement('td')
            phoneTd.innerText = patient.phone
            tr.appendChild(phoneTd)

            const actionsTd = document.createElement('td')
            const openBtn = document.createElement('button')
            openBtn.classList.add('btn', 'btn-success')
            openBtn.innerText = 'Open Session'
            openBtn.onclick = async () => {
                const data = await openSession(patient.id, getCookie('admin'), '',0)
                if (data) {
                    localStorage.setItem('se', data.sessionId)
                    window.open('/admin/current-session.html', '_self')
                }
            }
            actionsTd.appendChild(openBtn)
            tr.appendChild(actionsTd)

        })
        })
