import { auth } from "./firebase.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// ----------------------
// Dark Mode
// ----------------------

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {

    localStorage.setItem("theme", "dark");
    darkModeBtn.textContent = "☀️ Light Mode";

  } else {

    localStorage.setItem("theme", "light");
    darkModeBtn.textContent = "🌙 Dark Mode";

  }

});

// Load Saved Theme

if (localStorage.getItem("theme") === "dark") {

  document.body.classList.add("dark-mode");
  darkModeBtn.textContent = "☀️ Light Mode";

}

// ----------------------
// Notifications
// ----------------------

document.getElementById("notificationBtn").addEventListener("click", () => {

  alert("🔔 Push Notifications feature will be added soon.");

});

// ----------------------
// Logout
// ----------------------

document.getElementById("logoutBtn").addEventListener("click", async () => {

  try {

    await signOut(auth);

    alert("✅ Logged out successfully!");

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);

  }

});