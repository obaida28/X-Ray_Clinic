import { getSessionByState, openSession } from './functions.js'
import {getCookie} from './utils.js'
const tbody = document.getElementById('tbody')

document.getElementById('state').onchange = async () => {
    tbody.innerHTML= ''
    const sessions = await getSessionByState(document.getElementById('state').value)
    if (sessions) {
        sessions.map(session => {
            const tr = document.createElement('tr')
            tr.classList.add("table-light")
            tbody.appendChild(tr)

            const IdTd = document.createElement('td')
            IdTd.innerText = session.id
            tr.appendChild(IdTd)

            const patNameTd = document.createElement('td')
            patNameTd.innerText = session.patient_name
            tr.appendChild(patNameTd)

            const empNameTd = document.createElement('td')
            empNameTd.innerText = session.worker_name
            tr.appendChild(empNameTd)

            const actionsTd = document.createElement('td')
            tr.appendChild(actionsTd)
            if (session.state === 'end') {
                const addReportBtn = document.createElement('button')
                addReportBtn.innerText = 'Add Report'
                addReportBtn.classList.add('btn', 'btn-info')
                addReportBtn.onclick = async () => {
                    localStorage.removeItem('sessionId')
                    localStorage.setItem('sessionId',session.id)
                    window.open('/admin/create-report.html','_self')
                }
                actionsTd.appendChild(addReportBtn)
            } else if(session.state === 'active') {
                const openBtn = document.createElement('button')
                openBtn.innerText = 'Active'
                openBtn.classList.add('btn', 'btn-info')
                openBtn.onclick = async () => {
                    const data = await openSession(session.patient_id, getCookie('admin'), '',0)
                    if (data) {
                        localStorage.removeItem('se')
                        localStorage.setItem('se', data.sessionId)
                        window.open('/admin/current-session.html','_self')
                    }
                }
                openBtn.disabled='true'
                actionsTd.appendChild(openBtn)
            } else {
                const showBtn = document.createElement('button')
                showBtn.innerText = 'Show'
                showBtn.classList.add('btn', 'btn-info')
                showBtn.onclick = async () => {
                    localStorage.removeItem('session')
                    localStorage.setItem('session', session.id)
                    window.open('/admin/session.html','_self')
                }
        
                actionsTd.appendChild(showBtn)
            }
            
            
        })
    }
}