import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const brand = params.get("brand");
const model = params.get("model");

async function loadGuide() {

  const q = query(
    collection(db, "guides"),
    where("brand", "==", brand),
    where("model", "==", model)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    document.getElementById("guideTitle").textContent = "No Guide Found";
    return;
  }

  const guide = snapshot.docs[0].data();

  document.getElementById("guideTitle").textContent =
    guide.title || guide.model;

  document.getElementById("guideBrand").textContent =
    guide.brand;

  document.getElementById("guideModel").textContent =
    guide.model;

  document.getElementById("guideSteps").textContent =
    guide.guide || "No repair steps available.";

  if (guide.imageUrl) {

    const img = document.getElementById("guideImage");

    img.src = guide.imageUrl;

    img.style.display = "block";

  }

  if (guide.videoUrl) {

    document.getElementById("videoSection").innerHTML = `
      <a href="${guide.videoUrl}" target="_blank">
        <button>🎥 Watch Repair Video</button>
      </a>
    `;

  } else {

    document.getElementById("videoSection").innerHTML =
      "<p>No repair video available.</p>";

  }

}

document.getElementById("favoriteBtn").onclick = () => {

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const item = {

    brand: document.getElementById("guideBrand").textContent,

    model: document.getElementById("guideModel").textContent,

    title: document.getElementById("guideTitle").textContent

  };

  const exists = favorites.find(f =>
    f.brand === item.brand &&
    f.model === item.model
  );

  if (exists) {

    alert("❤️ Already Added to Favorites");

    return;

  }

  favorites.push(item);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  alert("✅ Added to Favorites");

};

loadGuide();