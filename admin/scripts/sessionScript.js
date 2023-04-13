import {addSessionReport, getSessionById, getXRayImages} from './functions.js'


window.onload = async () => {
    const data = await getSessionById(localStorage.getItem('session'))
    document.getElementById('patName').innerText = data.patient_name
    document.getElementById('empName').innerText = data.worker_name
    document.getElementById('report').value = data.report
    const imgs = await getXRayImages(localStorage.getItem('session'))
    document.getElementById('xray').src = "http://localhost:49458/Images/X_Ray/" + imgs[0].image;
    document.getElementById('lbl1').innerHTML = imgs[0].image_state;
    document.getElementById('lbl2').innerHTML = imgs[0].explain_state;
}

document.getElementById('addReport').onsubmit = async(e) => {
    e.preventDefault()
    const data = await addSessionReport(localStorage.getItem('session'),
        document.getElementById('report').value)
    if (data) {
        localStorage.removeItem('session')
        window.open('/admin/manageSessions.html','_self')
    }
}