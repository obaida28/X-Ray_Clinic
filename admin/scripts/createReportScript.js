import { addSessionReport } from './functions.js'
import { getXRayImages } from './functions.js'

document.getElementById('addReport').onsubmit = async(e) => {
    e.preventDefault()
    const data = await addSessionReport(localStorage.getItem('sessionId'),
        document.getElementById('report').value)
    if (data) {
        localStorage.removeItem('sessionId')
        window.open('/admin/manageSessions.html','_self')
    }
}
const imgs = await getXRayImages(localStorage.getItem('sessionId'))

document.getElementById('xray').src = "http://localhost:49458/Images/X_Ray/" + imgs[0].image;
document.getElementById('lbl1').innerHTML = imgs[0].image_state;
document.getElementById('lbl2').innerHTML = imgs[0].explain_state;