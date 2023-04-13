import { blockEmployeeAccount, getAllEmployees } from './functions.js'
import {getCookie} from './utils.js'
const tbody = document.getElementById('tbody')

window.onload = async () => {

    if (!getCookie('admin')) {
        window.open('/index.html', '_self')
    } else {
        var notAuthedItems = Array.from(document.getElementsByClassName('not-authed'))
        notAuthedItems.forEach(element => {
            element.style.display = 'none'
        })
        tbody.innerHTML = ''
        var data = await getAllEmployees()
        data.map(emp => {
            const tr = document.createElement('tr')
            tr.classList.add('table-light')
            tbody.appendChild(tr)

            const idTd = document.createElement('td')
            idTd.innerText = emp.id
            tr.appendChild(idTd)

            const nameTd = document.createElement('td')
            nameTd.innerText = emp.name
            tr.appendChild(nameTd)

            const typeTd = document.createElement('td')
            typeTd.innerText = emp.type
            tr.appendChild(typeTd)

            const start_timeTd = document.createElement('td')
            start_timeTd.innerText = emp.start_time
            tr.appendChild(start_timeTd)

            const end_timeTd = document.createElement('td')
            end_timeTd.innerText = emp.end_time
            tr.appendChild(end_timeTd)

            const actionTd = document.createElement('td')
                tr.appendChild(actionTd)

            const closeBtn = document.createElement('button')
            emp.state === 'active'
                ? closeBtn.innerText = 'Block Account'
                : closeBtn.innerText = 'UnBlock Account'
                
                closeBtn.classList.add('btn', 'btn-danger')
                closeBtn.onclick = async () => {
                        const data = await blockEmployeeAccount(emp.id)
                        if (data) {
                            emp.state === 'active'
                                ? closeBtn.innerText = 'UnBlock Account'
                                : closeBtn.innerText = 'Block Account'
                        }
                }

                actionTd.appendChild(closeBtn)
        })
    
    }
}