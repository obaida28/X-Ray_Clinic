import { getActiveAppointmentsByHour, getActiveHour, getEmployeeById, openSession } from './functions.js'
import { getCookie} from './utils.js'
const tbody = document.getElementById('tbody')
const hour = document.getElementById('hour')





hour.onchange = async() => {
    const apps = await getActiveAppointmentsByHour(hour.value)
    tbody.innerHTML = ''
    apps.map((app) => {
        const tr = document.createElement('tr')
        tr.classList.add("table-light")
        tbody.appendChild(tr)

        const patientNameTd = document.createElement('td')
        patientNameTd.innerText = app.patient_name
        tr.appendChild(patientNameTd)

        const patientAgeTd = document.createElement('td')
        patientAgeTd.innerText = app.age
        tr.appendChild(patientAgeTd)

        const patientPhoneTd = document.createElement('td')
        patientPhoneTd.innerText = app.phone
        tr.appendChild(patientPhoneTd)


        const actionsTd = document.createElement('td')
        const openBtn = document.createElement('button')
        openBtn.classList.add('btn', 'btn-success' ,'mx-3')
        openBtn.innerText = 'Open'
        openBtn.onclick = async () => {
            const data = await openSession(app.patient_id, getCookie('admin'), '' ,app.id)
            if (data) {
                localStorage.setItem('se', data.sessionId)
                window.open('/admin/current-session.html','_self')
            }
        }
        actionsTd.appendChild(openBtn)

        // const closeBtn = document.createElement('button')
        // closeBtn.classList.add('btn', 'btn-danger','mx-3')
        // closeBtn.innerText = 'End'
        // actionsTd.appendChild(closeBtn)

        // const editBtn = document.createElement('button')
        // editBtn.classList.add('btn', 'btn-warning','mx-3')
        // editBtn.innerText = 'Edit'
        // actionsTd.appendChild(editBtn)

        tr.appendChild(actionsTd)


    })
}


window.onload = async () => {
   // console.log(getCookie('admin'),getCookie('doc'))
    if(localStorage.getItem('se')){
        window.open('/admin/current-session.html','_self')
    } else if (getCookie('admin') || getCookie('doc')) {
      //  console.log(getCookie('admin'),getCookie('doc'))
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        // alert(today)
        const data = await getActiveHour(today)
        //console.log(data)
        hour.innerHTML =''
        data.map(hourObj => {
            hour.innerHTML += `<option value=${hourObj.hour1} >${hourObj.hour1}</option>`
        })
        if(getCookie('admin')){
            const data1 = await getEmployeeById(getCookie('admin'))
            if (data1 && data1.state !== "active") {
                document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.open('/index.html','_self')
            }
        }
        var notAuthedItems = Array.from(document.getElementsByClassName('not-authed'))
        notAuthedItems.forEach(element => {
            element.style.display ='none'
        });
        
        const d = new Date();
        let hr = d.getHours();
        hour.value = hr
        if(hour.value == '')
            hour.selectedIndex = 0;
        hour.onchange();
        if (!getCookie('doc')) {
            var docItems = Array.from(document.getElementsByClassName('doc-auth'))
        docItems.forEach(element => {
            element.style.display ='none'
        })
        }
    }else{
        alert(2)
 //        window.open('/index.html','_self')
    }

    
   
}