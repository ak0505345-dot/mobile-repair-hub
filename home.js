import { auth, db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const brandList=document.getElementById("brandList");
const searchBox=document.getElementById("searchBox");

let brands=[];

onAuthStateChanged(auth,(user)=>{

if(!user){
location.href="login.html";
return;
}

document.getElementById("userEmail").textContent=user.email;

});

async function loadBrands(){

const snapshot=await getDocs(collection(db,"brands"));

brands=[];

snapshot.forEach(doc=>{

brands.push(doc.data().name);

});

showBrands(brands);

}

function showBrands(list){

brandList.innerHTML="";

list.forEach(name=>{

const btn=document.createElement("button");

btn.textContent="📱 "+name;

btn.onclick=()=>{

location.href="models.html?brand="+encodeURIComponent(name);

};

brandList.appendChild(btn);

brandList.appendChild(document.createElement("br"));
brandList.appendChild(document.createElement("br"));

});

}

searchBox.addEventListener("input",()=>{

const text=searchBox.value.toLowerCase();

showBrands(

brands.filter(b=>b.toLowerCase().includes(text))

);

});

document.getElementById("logoutBtn").onclick=async()=>{

await signOut(auth);

location.href="login.html";

};

loadBrands();