import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const model = localStorage.getItem("selectedModel");

document.getElementById("modelTitle").textContent = model;

const guideImage = document.getElementById("guideImage");
const videoBtn = document.getElementById("videoBtn");
const guideText = document.getElementById("guideText");

async function loadGuide() {

  try {

    const snapshot = await getDocs(collection(db, "guides"));

    let found = false;

    snapshot.forEach((doc) => {

      const data = doc.data();

      if (data.model && data.model.trim() === model.trim()) {

        document.getElementById("repairType").textContent =
          data.repairType || "";

        document.getElementById("difficulty").textContent =
          data.difficulty || "Not Available";

        document.getElementById("repairTime").textContent =
          data.repairTime || "Not Available";

        document.getElementById("tools").textContent =
          data.tools || "Not Available";

        document.getElementById("parts").textContent =
          data.parts || "Not Available";

        guideText.innerHTML = "";

        if (data.guide) {

          const steps = data.guide.split("\n");
          steps.forEach(step => {

            if (step.trim() !== "") {

              const p = document.createElement("p");

              p.textContent = "✅ " + step;

              guideText.appendChild(p);

            }

          });

        }

        // Image

        if (data.imageUrl) {

          guideImage.src = data.imageUrl;

          guideImage.style.display = "block";

        } else {

          guideImage.style.display = "none";

        }

        // Video

        if (data.videoUrl) {

          videoBtn.style.display = "block";

          videoBtn.onclick = () => {

            window.open(data.videoUrl, "_blank");

          };

        } else {

          videoBtn.style.display = "none";

        }

        // Views

        document.getElementById("views").textContent =
          (data.views || 0) + " Views";

        found = true;

      }

    });

    if (!found) {

      document.getElementById("repairType").textContent = "";

      document.getElementById("difficulty").textContent = "";

      document.getElementById("repairTime").textContent = "";

      document.getElementById("tools").textContent = "";

      document.getElementById("parts").textContent = "";

      guideText.textContent = "Guide not found.";

    }

  } catch (error) {

    guideText.textContent = error.message;

  }

}loadGuide();