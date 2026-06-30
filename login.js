import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("⚠️ Please enter email and password.");
    return;
  }

  try {

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Email Verification Check
    await user.reload();

    if (!user.emailVerified) {

      await signOut(auth);

      alert(
        "⚠️ Your email is not verified.\n\nPlease verify your email before logging in."
      );

      return;

    }

    alert("✅ Login Successful!");

    window.location.href = "admin.html";

  } catch (error) {

    switch (error.code) {

      case "auth/invalid-credential":
        alert("❌ Invalid email or password.");
        break;

      case "auth/user-not-found":
        alert("❌ User not found.");
        break;

      case "auth/wrong-password":
        alert("❌ Incorrect password.");
        break;

      default:
        alert(error.message);

    }

  } finally {

    loginBtn.disabled = false;
    loginBtn.textContent = "🔐 Login";

  }

});