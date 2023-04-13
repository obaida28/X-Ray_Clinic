
const name1 = document.getElementById('name')
const pass = document.getElementById('pass')
const pass2 = document.getElementById('pass2')
const gender = document.getElementById('gender')
const phone = document.getElementById('phone')
const email = document.getElementById('email')
const address = document.getElementById('address')
const bDate = document.getElementById('bDate')
const image = document.getElementById('image')
import { URL } from "../mainURLscript.js"
let mainURL = URL
const patientUpdate = async () => {
    try {
        if (pass.value !== pass2.value) {
            throw new Error('Entered Passwords are not the same!')
        }
        const url = mainURL +'/API.asmx/editProfilePatients'
        const body = {
            "id":1,
            "name":name1.value,
            "password":pass.value,
            "phone":phone.value,
            "address":address.value,
            "gender":gender.value,
            "birthdate":bDate.value,
            "email":email.value ? email.value : null,
            "image":null,
            "note":null
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
        document.getElementById('patient-signup').reset()
        alert(data.d)
        
    } catch (error) {
        alert(error)
    }
    
}


document.getElementById('patient-signup').addEventListener('submit', (e) => {
    e.preventDefault()
    patientUpdate()
})