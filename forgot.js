import { auth } from "./firebase.js";

import {
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("⚠️ Please enter your email.");
    return;
  }

  try {

    resetBtn.disabled = true;
    resetBtn.textContent = "Sending...";

    await sendPasswordResetEmail(auth, email);

    alert(
      "✅ Password reset link has been sent.\n\nPlease check your email inbox and spam folder."
    );

    window.location.href = "login.html";

  } catch (error) {

    switch (error.code) {

      case "auth/user-not-found":
        alert("❌ No account found with this email.");
        break;

      case "auth/invalid-email":
        alert("❌ Invalid email address.");
        break;

      default:
        alert(error.message);

    }

  } finally {

    resetBtn.disabled = false;
    resetBtn.textContent = "📩 Send Reset Link";

  }

});