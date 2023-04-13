import { bookAppointment, getActiveHour, getClinicDetails, getPatientById } from "./APIs.js";
import {getCookie} from './utils.js'
var index = 0;
var slides = document.querySelectorAll(".slides");

var form = document.getElementById("book-form");

var pName = document.getElementById("p-name");
var pNum = document.getElementById("p-num");
var age = document.getElementById("age");
// var gender = document.getElementById("gender");
var time = document.getElementById("time")
var date = document.getElementById("date");
var docName = document.getElementById("doc-name");
var docNum = document.getElementById("doc-name");
var message = document.getElementById("message");
const logoutLink = document.getElementById('logout')





var btns = document.querySelectorAll('.bookBTN')

logoutLink.onclick = () => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.open('/patient-login.html','_self')
}

window.onload = async () => {
  // if not authed
  if (!getCookie('user')) {
    var btnsArr = Array.from(btns)
    btnsArr.forEach(btn => {
      btn.disabled = true
      btn.style.background = 'grey'
      btn.style.border= 'none'
      btn.innerText = 'You Need to Login First' 
    })
    var items2 = Array.from(document.querySelectorAll('.authed'))
    items2.forEach(element => {
      element.style.display='none'
    });
  } else {
    // if auhted
  var items = Array.from(document.getElementsByClassName('not-authed'))
  items.forEach(element => {
    element.style.display='none'
  });
    const user = await getPatientById(getCookie('user'))
    if (user && user.id) {
      pName.value = user.name;
      pNum.value = user.phone;
      age.value = user.age
    }
  }
  
  const clinicData = await getClinicDetails()
  if (clinicData) {
    Array.from(document.getElementsByClassName('clinic-num')).map(num => {
      num.innerText = clinicData.phone
    })

    Array.from(document.getElementsByClassName('clinic-email')).map(num => {
      num.innerText = clinicData.email
    })

    Array.from(document.getElementsByClassName('openHour')).map(num => {
      num.innerText = clinicData.clinic_open+":00"
    })

    Array.from(document.getElementsByClassName('closeHour')).map(num => {
      num.innerText = clinicData.clinic_close+":00"
    })

  }
  
}



date.onchange = async() => {
  var data = await getActiveHour(date.value)
  time.innerHTML =''
  data.map(hourObj => {
    time.innerHTML += `<option value=${hourObj.hour1} >${hourObj.hour1}</option>`
  })
}


form.addEventListener("submit", async(e)=>{
e.preventDefault()
const data = await getPatientById(getCookie('user'))
  if (data && data.state === "active") {
    const res = await bookAppointment(
      getCookie('user'),
      date.value,
      time.value.split(":")[0],
      message.value,
      docName.value ? docName.value : null,
      docNum.value ? docNum.value : null,
      pNum.value
    )
    if(res){form.reset();}
    
  } else {
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.open('/patient-login.html','_self')
  }
  
});




function changeSlide(){

  if(index<0){
    index = slides.length-1;
  }
  
  if(index>slides.length-1){
    index = 0;
  }
  
  for(let i=0;i<slides.length;i++){
    slides[i].style.display = "none";
    // dot[i].classList.remove("active");
  }
  
  slides[index].style.display= "block";
  // dot[index].classList.add("active");
  
  index++;
  
  setTimeout(changeSlide,5000);

  //reveal boxes
  function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
  
}

changeSlide();

// javascript for toggle menu 
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

var x = document.getElementById("myCheck").addEventListener('click',myFunction)
//for checkbox in book appointment form 
function myFunction() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");
  // Get the output text
  var name = document.getElementById("doc-name");
  var num = document.getElementById("doc-num");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    name.style.display = "block";
    num.style.display = "block";
  } else {
    name.style.display = "none";
    num.style.display = "none";
  }
}

