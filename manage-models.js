import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

let allModels = [];

// Load Models
async function loadModels() {

  const snapshot = await getDocs(collection(db, "models"));

  allModels = [];

  snapshot.forEach((docSnap) => {

    allModels.push({
      id: docSnap.id,
      ...docSnap.data()
    });

  });

  document.getElementById("totalModels").textContent = allModels.length;

  renderModels(allModels);
  loadBrandsFilter();

}

// Render Models
function renderModels(models) {

  const container = document.getElementById("modelsList");
  container.innerHTML = "";

  models.forEach((model) => {

    const div = document.createElement("div");

    div.innerHTML = `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <b>📱 ${model.model}</b><br>
        🏷️ Brand: ${model.brand}<br><br>
        <button onclick="deleteModel('${model.id}')">🗑️ Delete</button>
      </div>
    `;

    container.appendChild(div);

  });

}

// Delete Model
window.deleteModel = async (id) => {

  if (!confirm("Delete this model?")) return;

  await deleteDoc(doc(db, "models", id));

  alert("Deleted!");

  loadModels();

};

// Search
document.getElementById("searchBox").addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase();

  const filtered = allModels.filter(m =>
    m.model.toLowerCase().includes(value) ||
    m.brand.toLowerCase().includes(value)
  );

  renderModels(filtered);

});

// Load Brand Filter
async function loadBrandsFilter() {

  const snapshot = await getDocs(collection(db, "brands"));

  const select = document.getElementById("filterBrand");

  snapshot.forEach((docSnap) => {

    const option = document.createElement("option");

    option.value = docSnap.data().name;
    option.textContent = docSnap.data().name;

    select.appendChild(option);

  });

}

// Filter by Brand
document.getElementById("filterBrand").addEventListener("change", (e) => {

  const value = e.target.value;

  if (!value) {
    renderModels(allModels);
    return;
  }

  const filtered = allModels.filter(m => m.brand === value);

  renderModels(filtered);

});

loadModels();