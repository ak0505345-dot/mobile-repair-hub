import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const guideId = localStorage.getItem("editGuideId");

async function loadGuide() {

  try {

    const docRef = doc(db, "guides", guideId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("Guide not found!");
      return;
    }

    const data = docSnap.data();

    document.getElementById("brand").value = data.brand;
    document.getElementById("model").value = data.model;
    document.getElementById("repairType").value = data.repairType;
    document.getElementById("imageUrl").value = data.imageUrl || "";
    document.getElementById("videoUrl").value = data.videoUrl || "";
    document.getElementById("guide").value = data.guide;

  } catch (error) {

    alert(error.message);

  }

}

loadGuide();

document.getElementById("updateBtn").addEventListener("click", async () => {

  try {

    const docRef = doc(db, "guides", guideId);

    await updateDoc(docRef, {

      repairType: document.getElementById("repairType").value.trim(),
      imageUrl: document.getElementById("imageUrl").value.trim(),
      videoUrl: document.getElementById("videoUrl").value.trim(),
      guide: document.getElementById("guide").value.trim()

    });

    alert("✅ Guide Updated Successfully!");

    window.location.href = "manage-guides.html";

  } catch (error) {

    alert(error.message);

  }

});