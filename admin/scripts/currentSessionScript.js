import { getSessionById,closeSession,uploadXrayImage, getEmployeeById } from "./functions.js"
import { getCookie } from "./utils.js"

var patientId = ''


var second = 0;
    function pad ( value ) { return value > 9 ? value : "0" + value; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++second%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(second/60,10));
    }, 1000);

window.onload = async () => {
    if (getCookie('admin') && localStorage.getItem('se') !== null) {
        const data1 = await getEmployeeById(getCookie('admin'))
        if (data1 && data1.state !== "active") {
            document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.open('/index.html','_self')
        }
        if(!getCookie('doc')){
                        var docItems = Array.from(document.getElementsByClassName('doc-auth'))
                docItems.forEach(element => {
                    element.style.display ='none'
                });
        }
        const data = await getSessionById(localStorage.getItem('se'))
        document.getElementById('patName').innerText = data.patient_name
        document.getElementById('empName').innerText = data.worker_name
        patientId = data.patient_id
        var notAuthedItems = Array.from(document.getElementsByClassName('not-authed'))
        notAuthedItems.forEach(element => {
            element.style.display ='none'
        });
    }else{
        window.open('/index.html','_self')
    }
}

// document.getElementById('endBtn').onclick = async() => {
//     const data = await closeSession(localStorage.getItem('se'))
//     if (data) {
//         localStorage.removeItem('se')
//         window.open('/admin/appointments-current-hour.html','_self')
//     }
// }

// document.getElementById('addReportBtn').onclick = async() => {
//     window.open('/admin/create-report.html','_blank')
// }



document.getElementById('addDesc').onsubmit = async (e) => {
    e.preventDefault()
    if (document.getElementById('ai').value != '') {
        const data = await uploadXrayImage(
        document.getElementById('img').files[0],
        'no-title',
        document.getElementById('ai').value,
        document.getElementById('emp').value,
        patientId,
        localStorage.getItem('se'),
        getCookie('admin'),
        'note'
    )
    if (!data) {
        return
    }
    const data1 = await closeSession(localStorage.getItem('se'),document.getElementById("minutes").innerText)
    if (data1) {
        localStorage.removeItem('se')
        window.open('/admin/appointments-current-hour.html','_self')
    }
    }
    
}


document.getElementById('uploadAI').onclick = async () => {
    try {
    const URL = 'http://127.0.0.1:7000/images/'
    const formData = new FormData()
    formData.append('file', document.getElementById('img').files[0])
    const res = await fetch(URL, {
        method:'POST',
        body:formData
    })
    const data = await res.json()

    if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
        if (data.filename == 0) {
            document.getElementById('ai').value = "ضخامة ناميات"
        }else if (data.filename == 1) {
            document.getElementById('ai').value = "التهاب القصبات"
        }else if (data.filename == 3) {
            document.getElementById('ai').value = "الجنف"
        }else if (data.filename == 4) {
            document.getElementById('ai').value = " نقص تهوية في الجيوب الأنفية"
        }else 
            document.getElementById('ai').value = "طبيعي"

        document.getElementById('emp').value = document.getElementById('ai').value
        // switch(data.filename) {
        //     case 0:
        //         result = "ضخامة الناميات";
        //         break;
        //     case 1:
        //         result = "التهاب القصبات";
        //         break;
        //     case 3:
        //         result = "الجنف";
        //         break;
        //     case 4:
        //         result = " نقص تهوية في الجيوب الأنفية";
        //         break;
        //     default:
        //         result = "طبيعي";
        //   } 
            
        //}

    return data
    }catch (error){
        alert(error)
    }
}