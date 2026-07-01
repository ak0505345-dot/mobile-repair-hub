import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Load Brands
async function loadBrands() {

  const brandSelect = document.getElementById("brandSelect");

  const snapshot = await getDocs(collection(db, "brands"));

  snapshot.forEach(docSnap => {

    const option = document.createElement("option");

    option.value = docSnap.data().name;
    option.textContent = docSnap.data().name;

    brandSelect.appendChild(option);

  });

}

loadBrands();

// Load Models
document.getElementById("brandSelect").addEventListener("change", async (e) => {

  const brand = e.target.value;

  const modelSelect = document.getElementById("modelSelect");

  modelSelect.innerHTML = `<option value="">Select Model</option>`;

  if (!brand) return;

  const q = query(
    collection(db, "models"),
    where("brand", "==", brand)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {

    const option = document.createElement("option");

    option.value = docSnap.data().model;
    option.textContent = docSnap.data().model;

    modelSelect.appendChild(option);

  });

});

// Save Guide
document.getElementById("saveGuideBtn").addEventListener("click", async () => {

  const btn = document.getElementById("saveGuideBtn");

  const brand = document.getElementById("brandSelect").value;
  const model = document.getElementById("modelSelect").value;
  const title = document.getElementById("title").value.trim();
  const guide = document.getElementById("steps").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const videoUrl = document.getElementById("video").value.trim();

  if (!brand || !model || !title || !guide) {

    alert("⚠️ Please fill all required fields.");

    return;

  }

  btn.disabled = true;
  btn.textContent = "Saving...";

  try {

    // Duplicate Check

    const checkQuery = query(
      collection(db, "guides"),
      where("brand", "==", brand),
      where("model", "==", model)
    );

    const checkSnap = await getDocs(checkQuery);

    if (!checkSnap.empty) {

      alert("⚠️ Guide already exists for this model.");

      btn.disabled = false;
      btn.textContent = "💾 Save Guide";

      return;

    }

    await addDoc(collection(db, "guides"), {

      brand,
      model,
      title,
      guide,
      imageUrl,
      videoUrl,
      createdAt: new Date().toISOString()

    });

    alert("✅ Repair Guide Saved Successfully!");

    document.getElementById("brandSelect").value = "";
    document.getElementById("modelSelect").innerHTML =
      `<option value="">Select Model</option>`;
    document.getElementById("title").value = "";
    document.getElementById("steps").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("video").value = "";

  } catch (error) {

    alert(error.message);

  }

  btn.disabled = false;
  btn.textContent = "💾 Save Guide";

});