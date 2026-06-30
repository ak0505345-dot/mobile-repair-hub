import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const searchBox = document.getElementById("searchBox");
const searchResult = document.getElementById("searchResult");

let allModels = [];

async function loadModels() {

  const snapshot = await getDocs(collection(db, "models"));

  snapshot.forEach((doc) => {
    allModels.push(doc.data());
  });

}

loadModels();

searchBox.addEventListener("input", () => {

  const text = searchBox.value.toLowerCase().trim();

  searchResult.innerHTML = "";

  if (text === "") return;

  const result = allModels.filter(item =>
    item.model.toLowerCase().includes(text)
  );

  if (result.length === 0) {
    searchResult.innerHTML = "<p>No Model Found</p>";
    return;
  }

  result.forEach(item => {

    const button = document.createElement("button");

    button.textContent = item.brand + " - " + item.model;

    button.onclick = () => {

      localStorage.setItem("selectedBrand", item.brand);
      localStorage.setItem("selectedModel", item.model);

      window.location.href = "guide.html";

    };

    searchResult.appendChild(button);
    searchResult.appendChild(document.createElement("br"));
    searchResult.appendChild(document.createElement("br"));

  });

});