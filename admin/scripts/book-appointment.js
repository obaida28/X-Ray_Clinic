const date = document.getElementById('date')
const time = document.getElementById('time')
import { URL } from "../mainURLscript.js"
let mainURL = URL
const bookAppointment = async () => {

    try {
        document.getElementById('bt').disabled = true 
        const url = mainURL + '/API.asmx/bookAppoiment'
        const body = {
            "patient_id":1,
            "name":"testSaeed",
            "appDate":date.value,
            "hour":time.value.split(':')[0],
            "note":"s",
            "doctor_name":null,
            "doctor_number":null,
            "gender":"male",
            "phone" : "09354554"
        }
        const option = {
            'method':'POST',
            body: JSON.stringify(body),
            headers:{
                "Content-Type": "application/json"
            }
        }
        const res = await fetch(url, option)
        
        const data = await res.json()
        
                  
        
        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
        document.getElementById('book-form').reset()
        alert(data.d)
        
    } catch (error) {
        alert(error)
    }
    document.getElementById('bt').disabled = false
}

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault()
    bookAppointment()
})