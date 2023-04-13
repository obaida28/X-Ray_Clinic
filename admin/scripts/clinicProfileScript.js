import { updateClinic, getClinicDetails } from './functions.js'
import { getCookie } from './utils.js'
const clinicName = document.getElementById('clinicName')
const clinicEmail = document.getElementById('clinicEmail')
const clinicDocName = document.getElementById('clinicDocName')
const clinicPhone = document.getElementById('clinicPhone')
const openHour = document.getElementById('openHour')
const closeHour = document.getElementById('closeHour')
const desc = document.getElementById('desc')
const patPerHour = document.getElementById('patPerHour')


window.onload = async () => {
    if (!getCookie('doc')) {
        window.open('/index.html','_self')
    } else {
                var notAuthedItems = Array.from(document.getElementsByClassName('not-authed'))
        notAuthedItems.forEach(element => {
            element.style.display ='none'
        });
    const data = await getClinicDetails()
    if (data) {
        clinicDocName.value = data.doctor_name,
        clinicName.value = data.clinic_name,
        desc.value = data.decsraption,
        openHour.value = data.clinic_open ,
        closeHour.value = data.clinic_close ,
        patPerHour.value = data.patient_count_hour,
        clinicEmail.value = data.email ,
        clinicPhone.value = data.phone
    }}
}

document.getElementById('form').onsubmit = async (e) => {
    e.preventDefault()
    const data = await updateClinic(
        clinicDocName.value,
        clinicName.value,
        desc.value,
        openHour.value,
        closeHour.value,
        patPerHour.value,
        clinicEmail.value,
        clinicPhone.value
    )

}