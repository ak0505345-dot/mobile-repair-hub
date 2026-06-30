import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Load Brands in Dropdown
async function loadBrands() {
  const select = document.getElementById("brandName");

  const snapshot = await getDocs(collection(db, "brands"));

  snapshot.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc.data().name;
    option.textContent = doc.data().name;
    select.appendChild(option);
  });
}

loadBrands();

// Save Mobile Model
document.getElementById("saveModelBtn").addEventListener("click", async () => {

  const brand = document.getElementById("brandName").value;
  const model = document.getElementById("modelName").value.trim();

  if (brand === "" || model === "") {
    alert("Brand aur Model dono bharo.");
    return;
  }

  try {
    await addDoc(collection(db, "models"), {
      brand: brand,
      model: model
    });

    alert("✅ Model Saved Successfully!");

    document.getElementById("brandName").value = "";
    document.getElementById("modelName").value = "";

  } catch (error) {
    alert(error.message);
  }

});