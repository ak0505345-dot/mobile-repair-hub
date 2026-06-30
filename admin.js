import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ----------------------
// AUTH CHECK + USER INFO
// ----------------------
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("userEmail").textContent =
      "👤 " + user.email;
  }

});


// ----------------------
// LOGOUT
// ----------------------
document.getElementById("logoutBtn").addEventListener("click", async () => {

  await signOut(auth);
  alert("🚪 Logged out successfully!");
  window.location.href = "login.html";

});


// ----------------------
// DASHBOARD STATS
// ----------------------
async function loadDashboard() {

  try {

    const brands = await getDocs(collection(db, "brands"));
    document.getElementById("brandCount").textContent = brands.size;

    const models = await getDocs(collection(db, "models"));
    document.getElementById("modelCount").textContent = models.size;

    const guides = await getDocs(collection(db, "guides"));
    document.getElementById("guideCount").textContent = guides.size;

    const users = await getDocs(collection(db, "users"));
    document.getElementById("userCount").textContent = users.size;

  } catch (error) {

    console.log(error);

    document.getElementById("brandCount").textContent = "-";
    document.getElementById("modelCount").textContent = "-";
    document.getElementById("guideCount").textContent = "-";
    document.getElementById("userCount").textContent = "-";

  }

}

loadDashboard();