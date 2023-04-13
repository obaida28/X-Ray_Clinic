import { getPatientById,getAppointmentsByPatientId,updateAppointment } from './functions.js'

const name = document.getElementById('profileName')
const gender = document.getElementById('profileGender')
const age = document.getElementById('profileAge')
const number = document.getElementById('profileNumber')
const tbody = document.getElementById('tbody')
const updateForm = document.getElementById('update-app')
const cancelBtn = document.getElementById('cancel-bt')
var currentApp ={}

window.onload = async () => {
    const data = await getPatientById(1)
    name.innerText = data.name
    number.innerText = data.phone
    age.innerText = data.age
    gender.innerText = data.gender
    const apps = await getAppointmentsByPatientId(1)
    apps.map((appointment) => {
        tbody.innerHTML += `<tr class="table-dark">
                            <td scope="col" style='display:none;'>${appointment.id}</td>
                            <td scope="col">${appointment.AppoimentDate.split(' ')[0]}</td>
                            <td scope="col">${appointment.AppoimentHour}:00</td>
                            <td scope="col">
                                <button class='btn btn-danger app-cancel'>
                                    Cancel
                                </button>
                                <button class='btn btn-info app-update'>
                                    Update
                                </button>
                            </td>
                        </tr>`
        
        })
        document.querySelectorAll(`.app-cancel`).forEach(btn => {
        btn.addEventListener('click', async () => {
            btn.disabled = true;
            var id = btn.parentElement.parentElement.children[0].innerText
            cancelAppointment(id)
            btn.disabled = false;
            })
    })
    document.querySelectorAll(`.app-update`).forEach(btn => {
        btn.addEventListener('click', () => {
            btn.disabled = true;
            var id = btn.parentElement.parentElement.children[0].innerText
                updateForm.style.display= 'block'
            btn.disabled = false;
            currentApp.id = id;
            
            })
    })
}

cancelBtn.addEventListener('click', () => {
    updateForm.style.display ='none'
})

updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const date = document.getElementById('date')
    const time = document.getElementById('time')
    updateAppointment(currentApp.id, date.value, time.value.split(':')[0], '', null, null, 0)
    
})