import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

let guides = [];

async function loadGuides() {

const snapshot = await getDocs(collection(db,"guides"));

guides = [];

snapshot.forEach(doc => {

guides.push(doc.data());

});

showResults(guides);

}

function showResults(list){

searchResults.innerHTML="";

if(list.length===0){

searchResults.innerHTML="<h3>No Guides Found</h3>";
return;

}

list.forEach(item=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h3>${item.title}</h3>

<p>📱 ${item.brand} - ${item.model}</p>

<button>📖 Open Guide</button>

`;

card.querySelector("button").onclick=()=>{

location.href=
"guide.html?brand="+
encodeURIComponent(item.brand)+
"&model="+
encodeURIComponent(item.model);

};

searchResults.appendChild(card);

searchResults.appendChild(document.createElement("br"));

});

}

searchInput.addEventListener("input",()=>{

const text=searchInput.value.toLowerCase();

const filtered = guides.filter(item=>

(item.title || "").toLowerCase().includes(text) ||
(item.brand || "").toLowerCase().includes(text) ||
(item.model || "").toLowerCase().includes(text)

);

showResults(filtered);

});

loadGuides();