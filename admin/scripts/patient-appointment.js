
const tbody = document.getElementById('tbody')

import { URL } from "../mainURLscript.js"
let mainURL = URL
const getAppointmentsById = async (id) => {
    console.log(2)
    tbody.innerHTML =''
        const url = mainURL + `/API.asmx/ActiveAppoimentByPatient?id=${id}`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        data.d.table.map((appointment) => {
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
        btn.addEventListener('click', () => {
            btn.disabled = true;
            var id = btn.parentElement.parentElement.children[0].innerText
                cancelAppointment(id)
                btn.disabled = false;
            })
    })

    
        

    
}
window.onload = () => { getAppointmentsById(1) }




const cancelAppointment = async (id) => {
    try {
        const url = mainURL + `/API.asmx/CancelAppoiment`
    const body ={
        id
    }
        const res = await fetch(url, {
            method: 'POST',
            body:JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
        const data = await res.json()

        alert(data.d)

    } catch (error) {
        alert(error)
    }  
}

