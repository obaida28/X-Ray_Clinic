import { URL_ } from "../mainURLscript.js"
let mainURL = URL_
// Appointment functions

const bookAppointment = async (id, date, hour, note, docName, docNum, phone) => {

    try {

        const url = mainURL + '/AppoimentAPI.asmx/book'
        const parent = {
            'patient_id':id,
            'appDate':date,
            'hour':hour,
            'notes':note,
            'doctor_name':docName,
            'doctor_number':docNum,
            'phone':phone
        }
        const body = { 'parent':JSON.stringify(parent) }
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

        alert(data.message)
        return(data)
        
    } catch (error) {
        alert(error)
    }

}

const getActiveAppointmentsByPatientId = async (id) => {
    try {
        const url = mainURL + `/AppoimentAPI.asmx/select_active?id=${id}`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
        
    
 
}

const cancelAppointment = async (appId) => {
    try {
        const url = mainURL + `/AppoimentAPI.asmx/cancel`
        const body ={
            id:appId
        }
        const res = await fetch(url, {
            method: 'POST',
            body:JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()

        if (!res.ok ) {
            const message = data.Message;
            throw new Error(message);
        }else if(data.Message === "cannot be canceled before 24 hours"){
            const message = data.Message;
            throw new Error(message);
        }
        

        alert(data.message)
        return data

    } catch (error) {
        alert(error)
    }  
}

const updateAppointment = async (id,date,hour,note,docName,docNum,phone) => {
    try {

        const url = mainURL + '/AppoimentAPI.asmx/edit'
        const parent = {
            'id':id,
            'appDate':date,
            'hour':hour,
            'notes':note,
            'doctor_name':docName,
            'doctor_number':docNum,
            'phone':phone
        }
        const body={
            parent:JSON.stringify(parent)
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
        }else if(data.Message === "cannot be modified before 24 hours"){
            const message = data.Message;
            throw new Error(message);
        }

        alert(data.message)
        return data

    } catch (error) {
        alert(error)
    }

}

const getAllActiveAppointments = async () => {
    try {
        const url = mainURL + `/AppoimentAPI.asmx/SelectAll`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
}

const getAppointmentById = async (id) => {
    try {
        const url = mainURL + `/AppoimentAPI.asmx/select_appoiment?id=${id}`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
}




// Patients functions

const patientSignUp = async (name,pass,pass2,phone,address,gender,bDate,email,image,note) => {
    try {
        if (pass !== pass2) {
            throw new Error('Entered Passwords are not the same!')
        }
        const url = mainURL + '/PatientAPI.asmx/signUp'
        const formData = new FormData()
        formData.append('name',name)
        formData.append('password',pass)
        formData.append('phone',phone)
        formData.append('address',address)
        formData.append('gender',gender)
        formData.append('birthdate',bDate)
        if(email){
          formData.append('email',email)  
        }
        if(note){
           formData.append('notes',note) 
        }
        
        if (image) {
         
            formData.append('image', image)
        }
        const option = {
            'method':'POST',
            body: formData,
        }
        const res = await fetch(url, option)
        const data = await res.json()

        if (data.message === "This phone number belongs to another account") {
            throw new Error(data.message);
        }
        
        return data
        
    } catch (error) {
        alert(error)
    }
    
}

const patientUpdate = async (id,name,pass,pass2,phone,address,gender,bDate,email,image,note) => {
    try {
        if (pass !== pass2) {
            throw new Error('Entered Passwords are not the same!')
        }
        const url = mainURL + '/PatientAPI.asmx/editProfile'
        const formData = new FormData()
        formData.append('id',id)
        formData.append('name',name)
        formData.append('password',pass)
        formData.append('phone',phone)
        formData.append('address',address)
        formData.append('gender',gender)
        formData.append('birthdate',bDate)
        if(email){
          formData.append('email',email)  
        }
        if(note){
           formData.append('notes',note) 
        }

        if (image) {
            formData.append('image', image)
        }
        const option = {
            'method':'POST',
            body: formData,
        }
        const res = await fetch(url, option)
        const data = await res.json()

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }

        if (data.message === "This phone number belongs to another account") {
            throw new Error(data.message);
        }
        
        return data
        
    } catch (error) {
        alert(error)
    }
    
}

const getPatientById = async (id) => {
    try {
        const url = mainURL + `/PatientAPI.asmx/selectById?id=${id}`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
}

// Done
const patientLogin = async (phone,pass) => {
    try {

        const url = mainURL + '/PatientAPI.asmx/Login'
        const body = {
            "phone":phone,
            "password":pass
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
            if(message === 'no data found!'){
                throw new Error("Wrong Informations!, Check Your Informations. If The Informations Were Correct, Get In Touch With Us.");
            }else{
                throw new Error(message)
            }
                
        }

        return data
    } catch (error) {
        alert(error)
    }
}

const getAllPatients = async () => {
    try {
        const url = mainURL + `/PatientAPI.asmx/selectAll`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
}

const getPatientByPhone = async (phone) => {
    try {
        const url = mainURL + `/PatientAPI.asmx/selectByPhone?phone=${phone}`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
}


//Employee

const employeeLogin = async (phone,pass) => {
    try {

        const url = mainURL + '/EmployeeAPI.asmx/Login'
        const body = {
            "phone":phone,
            "password":pass
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
        alert("Welcome!")
        return data
    } catch (error) {
        alert(error)
    }
}

const employeeSignUp = async (name,pass,pass2,phone,address,startHour,endHour,email,image,note) => {
    try {
        if (pass !== pass2) {
            throw new Error('Entered Passwords are not the same!')
        }
        const url = mainURL + '/EmployeeAPI.asmx/signUp'
        const formData = new FormData()
        const body = {
            "name": name,
            "password": pass,
            "phone": phone,
            "address": address,
            "start_time":startHour,
            "end_time": endHour,
            "email": email,
            "notes": note
        }
        formData.append('parent', JSON.stringify(body))
        if (image !== null) {
            formData.append('image', image)
        }
        const option = {
            'method':'POST',
            body: formData,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        const res = await fetch(url, option)
        const data = await res.json()

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
        alert(data.message)
        
    } catch (error) {
        alert(error)
    }
    
}

const updateEmployee = async (id,name,pass,pass2,phone,address,startHour,endHour,email,image,note) => {
    try {
        if (pass !== pass2) {
            throw new Error('Entered Passwords are not the same!')
        }
        const url = mainURL + '/EmployeeAPI.asmx/editProfile'
        const formData = new FormData()
        const body = {
            "id":id,
            "name": name,
            "password": pass,
            "phone": phone,
            "address": address,
            "start_time":startHour,
            "end_time": endHour,
            "email": email,
            "notes": note
        }
        formData.append('parent', JSON.stringify(body))
        if (image !== null) {
            formData.append('image', image)
        }
        const option = {
            'method':'POST',
            body: formData,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
        const res = await fetch(url, option)
        const data = await res.json()

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
        alert(data.message)
        
    } catch (error) {
        alert(error)
    }
    
}

const getAllEmployees = async () => {
    try {
        const url = mainURL + `/EmployeeAPI.asmx/selectAll`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
}

const getEmployeeById = async (id) => {
    try {
        const url = mainURL + `/EmployeeAPI.asmx/selectById?id=${id}`
        const res = await fetch(url, {
            method:'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            const message = data.Message;
            throw new Error(message);
        }
    const data = await res.json()
    
    return data
    } catch (error) {
        alert(error)
    }
}

//Clinic
const getClinicDetails = async () => {

    try {
        const url = mainURL + '/ClinicAPI.asmx/Select_clinic'
        const option = {
            'method':'GET',
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
        return data
    } catch (error) {
        alert(error)
    }
}

const getActiveHour = async (date) => {

    try {
        const url = mainURL + `/ClinicAPI.asmx/select_Active_Hour?date='${date}'`
        const option = {
            'method':'GET',
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

        return data
    } catch (error) {
        alert(error)
    }
}

const updateClinic = async (docName,clinicName,desc,openHour,closeHour,patientPerHr,email,phone) => {

    try {
        const url = mainURL + "/ClinicAPI.asmx/edit"

        const parent= {
            'doctor_name':docName,
            'clinic_name':clinicName,
            'decsraption':desc,
            'clinic_open':openHour,
            'clinic_close':closeHour,
            'patient_count_hour':patientPerHr,
            'email':email,
            'phone':phone
        }
        const body={'parent':JSON.stringify(parent)}
        const option = {
            'method': 'POST',
            body:JSON.stringify(body),
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
        alert(data.message)
        return data
    } catch (error) {
        alert(error)
    }

}

//Session

const openSession = async(patientId,employeeId,notes)=> {
try {
        const url = mainURL + "/SessionAPI.asmx/open"

        const parent= {
            'patient_id':patientId,
            'worker_id':employeeId,
            'notes':notes
        }
        const body={'parent':JSON.stringify(parent)}
        const option = {
            'method': 'POST',
            body:JSON.stringify(body),
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
        alert(data.message)
        return data
    } catch (error) {
        alert(error)
    }

}

const updateSession = async(sessionId,notes)=> {
try {
        const url = mainURL + "/SessionAPI.asmx/edit"

        const parent= {
            'id':sessionId,
            'notes':notes
        }
        const body={'parent':JSON.stringify(parent)}
        const option = {
            'method': 'POST',
            body:JSON.stringify(body),
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
        alert(data.message)
        return data
    } catch (error) {
        alert(error)
    }

}

const closeSession = async(sessionId)=> {
try {
        const url = mainURL + "/SessionAPI.asmx/end"

        const body={
            'id': sessionId
        }
        const option = {
            'method': 'POST',
            body:JSON.stringify(body),
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
        alert(data.message)
        return data
    } catch (error) {
        alert(error)
    }

}

const getAllActiveSessions = async()=> {
try {
        const url = mainURL + "/SessionAPI.asmx/selectAll"

        const option = {
            'method': 'GET',
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

        return data
    } catch (error) {
        alert(error)
    }

}

const getSessionById = async(sessionId)=> {
try {
        const url = mainURL + `/SessionAPI.asmx/selectById?id=${sessionId}`

        const option = {
            'method': 'GET',
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

        return data
    } catch (error) {
        alert(error)
    }

}

const getSessionByState = async(sessionState)=> {
try {
        const url = mainURL + `/SessionAPI.asmx/selectByState?state=${sessionState}`

        const option = {
            'method': 'GET',
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

        return data
    } catch (error) {
        alert(error)
    }

}

const getSessionByPatientId = async(patientId)=> {
try {
        const url = mainURL + `/SessionAPI.asmx/selectByPatient?patient_id=${patientId}`

        const option = {
            'method': 'GET',
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

        return data
    } catch (error) {
        alert(error)
    }

}

const addSessionReport = async(sessionId,report)=> {
try {
        const url = mainURL + `/SessionAPI.asmx/addReport`

        const body={
            "id":sessionId,
            "report":report
        }
        const option = {
            'method': 'POST',
            body:JSON.stringify(body),
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

        alert(data.message)
        return data
    } catch (error) {
        alert(error)
    }

}







export {
    bookAppointment,
    getActiveAppointmentsByPatientId,
    patientSignUp,
    cancelAppointment,
    patientUpdate,
    patientLogin,
    getPatientById,
    getAllPatients,
    updateAppointment,
    getAllActiveAppointments,
    getAppointmentById,
    employeeLogin,
    employeeSignUp,
    updateEmployee,
    getAllEmployees,
    getEmployeeById,
    getActiveHour,
    getClinicDetails,
    updateClinic,
    openSession,
    updateSession,
    closeSession,
    getAllActiveSessions,
    getSessionById,
    getSessionByState,
    getPatientByPhone,
    getSessionByPatientId,
    addSessionReport
}