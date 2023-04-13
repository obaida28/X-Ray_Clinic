import { getAllPatients,getPatientByPhone,blockPatientAccount} from './functions.js'
const tbody = document.getElementById('tbody')
const phone = document.getElementById('input')

window.onload = async() => {
    const pateintsArr = await getAllPatients()
        pateintsArr.map((patient) => {
                const tr = document.createElement('tr')
                tr.classList.add('table-light')
                tbody.appendChild(tr)

         

                const idTd = document.createElement('td')
                idTd.innerText = patient.id
                tr.appendChild(idTd)
                const nameTd = document.createElement('td')
                nameTd.innerText = patient.name
                tr.appendChild(nameTd)

                const phoneTd = document.createElement('td')
                phoneTd.innerText = patient.phone
                tr.appendChild(phoneTd)

                const emailTd = document.createElement('td')
                emailTd.innerText = patient.email
                tr.appendChild(emailTd)

                const addressTd = document.createElement('td')
                addressTd.innerText = patient.address
                tr.appendChild(addressTd)

                const genderTd = document.createElement('td')
                genderTd.innerText = patient.gender
                tr.appendChild(genderTd)

                const bdayTd = document.createElement('td')
                //let last = patient.birthdate.IndexOf(' ')
                bdayTd.innerText = patient.birthdate.substring(0,10)
                tr.appendChild(bdayTd)

                const actionTd = document.createElement('td')
                tr.appendChild(actionTd)

                const closeBtn = document.createElement('button')
                patient.state === 'active'
                        ? closeBtn.innerText = 'Block Account'
                        : closeBtn.innerText = 'UnBlock Account'
                        
                closeBtn.classList.add('btn', 'btn-danger')
                closeBtn.onclick = async () => {
                        const data = await blockPatientAccount(patient.id)
                        if (data) {
                                patient.state === 'active'
                                        ? closeBtn.innerText = 'UnBlock Account'
                                        : closeBtn.innerText = 'Block Account'        
                        }
                }
                actionTd.appendChild(closeBtn)

        
        })
} 

document.getElementById('search').addEventListener('click',async()=>{
        tbody.innerHTML = ''
        const data = await getPatientByPhone(phone.value.toString())
        data.map((patient) => {
const tr = document.createElement('tr')
                tr.classList.add('table-light')
                tbody.appendChild(tr)


                const idTd = document.createElement('td')
                idTd.innerText = patient.id
                tr.appendChild(idTd)
                const nameTd = document.createElement('td')
                nameTd.innerText = patient.name
                tr.appendChild(nameTd)

                const phoneTd = document.createElement('td')
                phoneTd.innerText = patient.phone
                tr.appendChild(phoneTd)

                const emailTd = document.createElement('td')
                emailTd.innerText = patient.email
                tr.appendChild(emailTd)

                const addressTd = document.createElement('td')
                addressTd.innerText = patient.address
                tr.appendChild(addressTd)

                const genderTd = document.createElement('td')
                genderTd.innerText = patient.gender
                tr.appendChild(genderTd)

                const bdayTd = document.createElement('td')
                bdayTd.innerText = patient.birthdate
                tr.appendChild(bdayTd)

                const actionTd = document.createElement('td')
                tr.appendChild(actionTd)

                const closeBtn = document.createElement('button')
                patient.state === 'active'
                        ? closeBtn.innerText = 'Block Account'
                        : closeBtn.innerText = 'UnBlock Account'
                closeBtn.classList.add('btn', 'btn-danger')
                closeBtn.onclick = async () => {
                        const data = await blockPatientAccount(patient.id)
                        if (data) {
                                 patient.state === 'active'
                                        ? closeBtn.innerText = 'UnBlock Account'
                                        : closeBtn.innerText = 'Block Account' 
                        }
                }

                actionTd.appendChild(closeBtn)
        })
})