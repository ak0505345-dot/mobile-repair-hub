import { auth } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(!user){

location.href="login.html";
return;

}

document.getElementById("userName").textContent =
user.displayName || "Mobile Repair Hub User";

document.getElementById("userEmail").textContent =
user.email;

if(user.photoURL){

document.getElementById("profilePhoto").src =
user.photoURL;

}

});

document.getElementById("logoutBtn").onclick = async ()=>{

await signOut(auth);

location.href="login.html";

};