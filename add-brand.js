import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const saveBtn = document.getElementById("saveBrandBtn");

saveBtn.addEventListener("click", async () => {

  const brand = document.getElementById("brandName").value.trim();

  if (!brand) {
    alert("⚠️ Please enter brand name.");
    return;
  }

  try {

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    const q = query(
      collection(db, "brands"),
      where("name", "==", brand)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("⚠️ Brand already exists.");
      return;
    }

    await addDoc(collection(db, "brands"), {
      name: brand,
      createdAt: new Date().toISOString()
    });

    alert("✅ Brand saved successfully!");

    document.getElementById("brandName").value = "";

  } catch (error) {

    alert(error.message);

  } finally {

    saveBtn.disabled = false;
    saveBtn.textContent = "💾 Save Brand";

  }

});