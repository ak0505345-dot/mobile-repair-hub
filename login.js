import { auth, googleProvider } from "./firebase.js";

import {
signInWithEmailAndPassword,
signInWithRedirect,
getRedirectResult
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Google Redirect Result
getRedirectResult(auth)
.then((result)=>{

if(result){

alert("✅ Google Login Successful");

window.location.href="home.html";

}

})
.catch((error)=>{

console.log(error);

});

// Email Login
document.getElementById("loginBtn").addEventListener("click",async()=>{

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value.trim();

if(!email||!password){

alert("Please enter email and password.");

return;

}

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("✅ Login Successful");

window.location.href="home.html";

}catch(error){

alert(error.message);

}

});

// Google Login
document.getElementById("googleLoginBtn").addEventListener("click",async()=>{

try{

await signInWithRedirect(
auth,
googleProvider
);

}catch(error){

alert(error.message);

}

});