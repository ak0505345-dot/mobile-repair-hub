import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!fullname || !email || !password) {
    alert("⚠️ Please fill all fields.");
    return;
  }

  if (password.length < 6) {
    alert("⚠️ Password must be at least 6 characters.");
    return;
  }

  try {

    registerBtn.disabled = true;
    registerBtn.textContent = "Creating Account...";

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      fullname: fullname,
      email: email,
      createdAt: new Date().toISOString()
    });

    await sendEmailVerification(user);

    alert("✅ Account Created!\n\nVerification email has been sent. Please verify your email before login.");

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);

  } finally {

    registerBtn.disabled = false;
    registerBtn.textContent = "Create Account";

  }

});