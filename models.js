import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const brand = localStorage.getItem("selectedBrand");

document.getElementById("brandTitle").textContent = brand;

const modelList = document.getElementById("modelList");
const searchBox = document.getElementById("searchBox");

let allModels = [];

async function loadModels() {

  try {

    const q = query(
      collection(db, "models"),
      where("brand", "==", brand)
    );

    const snapshot = await getDocs(q);

    allModels = [];

    snapshot.forEach((doc) => {
      allModels.push(doc.data().model);
    });

    showModels(allModels);

  } catch (error) {

    modelList.innerHTML = error.message;

  }

}

function showModels(models) {

  modelList.innerHTML = "";

  if (models.length === 0) {
    modelList.innerHTML = "<h3>No Models Found</h3>";
    return;
  }

  models.forEach((model) => {

    const button = document.createElement("button");
    button.textContent = model;

    button.onclick = () => {
      localStorage.setItem("selectedModel", model);
      window.location.href = "guide.html";
    };

    modelList.appendChild(button);
    modelList.appendChild(document.createElement("br"));
    modelList.appendChild(document.createElement("br"));

  });

}

searchBox.addEventListener("input", () => {

  const text = searchBox.value.toLowerCase();

  const filtered = allModels.filter(model =>
    model.toLowerCase().includes(text)
  );

  showModels(filtered);

});

loadModels();