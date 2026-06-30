import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const saveBtn = document.getElementById("saveModelBtn");

// Load Brands
async function loadBrands() {

  const select = document.getElementById("brandName");

  const snapshot = await getDocs(collection(db, "brands"));

  snapshot.forEach((docSnap) => {

    const option = document.createElement("option");

    option.value = docSnap.data().name;
    option.textContent = docSnap.data().name;

    select.appendChild(option);

  });

}

loadBrands();

// Save Model
saveBtn.addEventListener("click", async () => {

  const brand = document.getElementById("brandName").value;
  const model = document.getElementById("modelName").value.trim();

  if (!brand || !model) {

    alert("⚠️ Please select brand and enter model.");

    return;

  }

  try {

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    const q = query(
      collection(db, "models"),
      where("brand", "==", brand),
      where("model", "==", model)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {

      alert("⚠️ This model already exists.");

      return;

    }

    await addDoc(collection(db, "models"), {

      brand: brand,
      model: model,
      createdAt: new Date().toISOString()

    });

    alert("✅ Mobile Model Saved Successfully!");

    document.getElementById("brandName").value = "";
    document.getElementById("modelName").value = "";

  } catch (error) {

    alert(error.message);

  } finally {

    saveBtn.disabled = false;
    saveBtn.textContent = "💾 Save Model";

  }

});