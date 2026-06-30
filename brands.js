import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const brandList = document.getElementById("brandList");

async function loadBrands() {
  brandList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "brands"));

  snapshot.forEach((doc) => {
    const brand = doc.data().name;

    const button = document.createElement("button");
    button.textContent = brand;

    button.onclick = () => {
      localStorage.setItem("selectedBrand", brand);
      window.location.href = "models.html";
    };

    brandList.appendChild(button);
    brandList.appendChild(document.createElement("br"));
    brandList.appendChild(document.createElement("br"));
  });
}

loadBrands();