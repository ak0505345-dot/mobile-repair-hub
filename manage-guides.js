import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const guideList = document.getElementById("guideList");
const searchGuide = document.getElementById("searchGuide");
const totalGuides = document.getElementById("totalGuides");

let allGuides = [];

async function loadGuides() {

  guideList.innerHTML = "<h3>⏳ Loading Guides...</h3>";

  try {

    const snapshot = await getDocs(collection(db, "guides"));

    allGuides = [];

    snapshot.forEach((guide) => {

      allGuides.push({
        id: guide.id,
        ...guide.data()
      });

    });

    if (totalGuides) {
      totalGuides.textContent = allGuides.length;
    }

    showGuides(allGuides);

  } catch (error) {

    guideList.innerHTML =
      `<h3 style="color:red;">${error.message}</h3>`;

  }

}

function showGuides(list) {

  guideList.innerHTML = "";

  if (list.length === 0) {

    guideList.innerHTML = "<h3>📭 No Repair Guides Found</h3>";

    return;

  }

  list.forEach((item) => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      ${item.imageUrl ?

      `<img
      src="${item.imageUrl}"
      style="
      width:100%;
      max-width:200px;
      border-radius:10px;
      margin-bottom:10px;
      ">`

      : ""}

      <h3>📱 ${item.brand || "-"} - ${item.model || "-"}</h3>

      <p><b>🔧 Repair:</b> ${item.repairType || "-"}</p>

      ${item.video ?
      `<p><a href="${item.video}" target="_blank">🎥 Watch Video</a></p>`
      : ""}

      <button class="editBtn">
      ✏️ Edit
      </button>

      <button class="deleteBtn">
      🗑 Delete
      </button>

    `;

    // Edit

    card.querySelector(".editBtn").onclick = () => {

      localStorage.setItem("editGuideId", item.id);

      window.location.href = "edit-guide.html";

    };

    // Delete

    card.querySelector(".deleteBtn").onclick = async () => {

      if (!confirm("Delete this repair guide?")) return;

      try {

        await deleteDoc(doc(db, "guides", item.id));

        alert("✅ Guide Deleted Successfully");

        loadGuides();

      } catch (error) {

        alert(error.message);

      }

    };

    guideList.appendChild(card);

    guideList.appendChild(document.createElement("br"));

  });

}

// Live Search

searchGuide.addEventListener("input", () => {

  const text = searchGuide.value.toLowerCase().trim();

  const filtered = allGuides.filter(item =>

    (item.brand || "").toLowerCase().includes(text) ||

    (item.model || "").toLowerCase().includes(text) ||

    (item.repairType || "").toLowerCase().includes(text)

  );

  showGuides(filtered);

});

loadGuides();