import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const brand = params.get("brand");

document.getElementById("brandTitle").textContent = "📱 " + brand;

const modelList = document.getElementById("modelList");
const searchModel = document.getElementById("searchModel");

let models = [];

async function loadModels() {

const q = query(
collection(db,"models"),
where("brand","==",brand)
);

const snapshot = await getDocs(q);

models = [];

snapshot.forEach(doc => {

models.push(doc.data().model);

});

showModels(models);

}

function showModels(list){

modelList.innerHTML="";

if(list.length===0){

modelList.innerHTML="<h3>No Models Found</h3>";
return;

}

list.forEach(model=>{

const btn=document.createElement("button");

btn.textContent="📱 "+model;

btn.onclick=()=>{

location.href=
"guide.html?brand="+
encodeURIComponent(brand)+
"&model="+
encodeURIComponent(model);

};

modelList.appendChild(btn);

modelList.appendChild(document.createElement("br"));
modelList.appendChild(document.createElement("br"));

});

}

searchModel.addEventListener("input",()=>{

const text=searchModel.value.toLowerCase();

showModels(

models.filter(model=>

model.toLowerCase().includes(text)

)

);

});

loadModels();