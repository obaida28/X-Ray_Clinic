import { getActiveAppointmentsByPatientId, cancelAppointment, updateAppointment, getActiveHour, getPatientById, getSessionByPatientId } from "./APIs.js"
import {getXRayImages} from '../admin/scripts/functions.js'
import {getCookie} from './utils.js'
const report1= document.getElementById('report1');
const modal = document.getElementById('modal');
const close = document.getElementById('closeBTN');
const tbody = document.getElementById('tbody');
const tbody2 = document.getElementById('tbody2');
const id = document.getElementById('id');
const pic = document.getElementById('pic')
const date = document.getElementById('date');
const time =document.getElementById('time');
const note= document.getElementById('note');
const docName =document.getElementById('docName');
const docNum =document.getElementById('docNum');
const phoneNum =document.getElementById('phoneNum');
import { URL_ } from "../mainURLscript.js"
let mainURL = URL_
// const updateBtn = document.getElementById('updateBtn');
//  console.log(updateBtn);
const editBtn = document.getElementById('editBtn')

window.onload = async() => {
  if (!getCookie('user')) {
    window.open('/index.html','_self')
  }else{
    const data = await getPatientById(getCookie('user'))
  if (data && data.state !== "active") {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.open('/patient-login.html','_self')
  }
  }
}

editBtn.onclick =()=>{
  window.open('/edit-profile.html','_self')
}

// report1.addEventListener('click', function(e){
// modal.classList.add('show-modal');


// });
//console.log(modal);
close.addEventListener('click', function(){
    modal.classList.remove('show-modal');
});
window.addEventListener('click', function(e){
    if (e.target === modal){modal.classList.remove('show-modal');}
});
window.onload = async function (){
// const appointments =  await getActiveAppointmentsByPatientId(getCookie('user'));
  
  const user = await getPatientById(getCookie('user'))
  document.getElementById('name').innerText = user.name
  document.getElementById('email').innerText = user.email
  document.getElementById('age').innerText = user.age
  document.getElementById('gender').innerText = user.gender
  document.getElementById('address').innerText = user.address
  if(user.image != "default.png")
    pic.src = mainURL + `/Images/Patient/${user.image}`
  const sessions = await getSessionByPatientId(getCookie('user'))
  // <tr class="t-row">
  //             <td>Hospital Visit</td>
  //             <td><img src="./images/icons8.png" class="icon">15/6/2020</td>
  //             <td><button class="view-report" id="report1"> View Report</button></td>

  //           </tr>
  sessions.forEach(session => {
    const tr = document.createElement('tr')
    tr.classList.add('t-row')
    tbody2.appendChild(tr)

    const tdid =document.createElement('td')
    tdid.innerText =session.id
    tdid.style.display = "none";
    tr.appendChild(tdid);

    const tdDate=document.createElement('td')
    tdDate.innerText =session.dateCreated.substr(0,10)
    tr.appendChild(tdDate);

    const show = document.createElement('button')
    show.classList.add('view-report' ,'show-btn');
    show.innerText +="Show";
    show.style.marginRight='5px';
    tr.appendChild(show);
    // const tdReport=document.createElement('td')
    // tr.appendChild(tdReport);

  show.onclick = async function () {
    const sessionId = show.parentNode.children[0].innerHTML;
      const imgs = await getXRayImages(sessionId);
      try{
        const m = imgs[0];
      document.getElementById('xray').src = "http://localhost:49458/Images/X_Ray/" + m.image;
      document.getElementById('lbl1').innerHTML = m.image_state;
      document.getElementById('lbl2').innerHTML = m.explain_state;
      document.getElementById('l1').innerHTML = "تشخيص الصورة"
      document.getElementById('l2').innerHTML = "تشخيص الموظف"
      document.getElementById('l3').innerHTML = "تقرير الطبيب"
      if(session.state != "archived"){
        document.getElementById("lbl3").innerText = "لم يتم إضافة التقرير بعد"
        document.getElementById("lbl3").style.color = "red"
      }
       else
       document.getElementById("lbl3").innerText = session.report
      }
      catch(e){
        document.getElementById('xray').src = "";
        document.getElementById('lbl1').innerHTML = "لا يوجد بيانات لهذه الجلسة";
        document.getElementById('l1').innerHTML = document.getElementById('l2').innerHTML = document.getElementById('lbl3').innerHTML = document.getElementById('lbl2').innerHTML = document.getElementById('l3').innerHTML = "";
      }
      }

    });
const appointments = await getActiveAppointmentsByPatientId(getCookie('user'))
appointments.forEach(appointment => { 
const tr = document.createElement('tr')
tr.classList.add('t-row')
tbody.appendChild(tr)

const tdID=document.createElement('td')
tdID.style.display="none";
tdID.innerText =appointment.id;
tr.appendChild(tdID);

const tdHour=document.createElement('td')
tdHour.classList.add('day');
tdHour.innerText =appointment.AppoimentHour+":00";
tr.appendChild(tdHour);

const tdDate=document.createElement('td')
tdDate.classList.add('day');
tdDate.innerHTML =`<img src="../images/icons8.png" class="icon">${appointment.AppoimentDate.split(" ")[0]}`;
tr.appendChild(tdDate);

const tdButton = document.createElement('td')
tdButton.classList.add('day')
const tdUpdate= document.createElement('button')
tdUpdate.classList.add('view-report' ,'update-btn');
tdUpdate.innerText +="Update";
tdUpdate.style.marginRight='5px'
const tdCancel =document.createElement('button');
tdCancel.classList.add('view-report', 'cancel', 'cancel-btn');
tdCancel.innerText +="Cancel"
tdButton.appendChild(tdUpdate);
tdButton.appendChild(tdCancel);
tr.appendChild(tdButton);
 

  tdUpdate.onclick = async function () {
    localStorage.removeItem('app')
  localStorage.setItem('app', JSON.stringify(appointment))
    let app1 = JSON.parse(localStorage.getItem("app"));
    time.innerHTML ='<option> Loading </option>'
  var data = await getActiveHour(app1.AppoimentDate.split(" ")[0])
  time.innerHTML =''
  data.map(hourObj => {
    time.innerHTML += `<option value=${hourObj.hour1} >${hourObj.hour1}</option>`
  })
  
// console.log( app1.AppoimentDate.split(" ")[1]);
id.value=app1.id;
date.value=app1.AppoimentDate.split(" ")[0];

time.value=app1.AppoimentHour;

note.value=app1.notes;
//docName.value =app1.doctor_name;
//docNum.value= app1.doctor_number;
  }
  
  tdCancel.onclick = async() => {
    var conf = confirm("هل أنت متأكد؟");
    if(conf){
    const data = await cancelAppointment(appointment.id);
    if (data) {
      tdCancel.parentElement.parentElement.remove(); 
    }
  } 
  }
   
  date.onchange = async () => {
  time.innerHTML ='<option> Loading </option>'
  var data = await getActiveHour(date.value)
  time.innerHTML =''
  data.map(hourObj => {
    time.innerHTML += `<option value=${hourObj.hour1} >${hourObj.hour1}</option>`
  })
}



document.getElementById('updateBtn').onclick=async function(){
  const data = await updateAppointment(id.value, date.value, time.value, note.value);
  if (data) {
    document.getElementById('forms').classList.replace('show-modal', 'none');
    localStorage.removeItem("app")
    window.open('my-profile.html','_self');
  }
}
 });



 const showBTN = document.querySelectorAll('.show-btn');
 //  console.log(updateBtn);
 showBTN.forEach(showb =>{
  showb.addEventListener('click', async function(){
  document.getElementById('formsShow').classList.replace('none','show-modal');
   
   })
   
  })
  document.getElementById('close2BTNShow').addEventListener('click', function(){
   document.getElementById('formsShow').classList.replace('show-modal','none');
  })



 const updateBtn = document.querySelectorAll('.update-btn');
//  console.log(updateBtn);
 updateBtn.forEach(updatebtn =>{
 updatebtn.addEventListener('click', async function(){
//var data = await getActiveHour(date.value)
  // time.innerHTML =''
  // data.map(hourObj => {
  //   time.innerHTML += `<option value=${hourObj.hour1} >${hourObj.hour1}</option>`
  // })
document.getElementById('forms').classList.replace('none','show-modal');
  
  })
  
 })
 document.getElementById('close2BTN').addEventListener('click', function(){
  document.getElementById('forms').classList.replace('show-modal','none');
 })
}