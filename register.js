import { auth, db, googleProvider } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithRedirect
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Email Register
document.getElementById("registerBtn").addEventListener("click", async () => {

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!fullname || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      fullname,
      email,
      role: "user",
      createdAt: new Date().toISOString()
    });

    alert("✅ Account Created Successfully!");

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);

  }

});

// Google Register
document.getElementById("googleRegisterBtn").addEventListener("click", async () => {

  try {

    await signInWithRedirect(auth, googleProvider);

  } catch (error) {

    alert(error.message);

  }

});