import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// --------------------
// Cloudinary Settings
// --------------------
const CLOUD_NAME = "dflm2eduw";
const UPLOAD_PRESET = "mobile repair hub";

// --------------------
// Load Brands
// --------------------
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

// --------------------
// Upload Image
// --------------------
document.getElementById("uploadImageBtn").addEventListener("click", async () => {

  const file = document.getElementById("imageFile").files[0];

  if (!file) {
    alert("⚠️ Please select an image.");
    return;
  }

  const btn = document.getElementById("uploadImageBtn");

  btn.disabled = true;
  btn.textContent = "⏳ Uploading...";

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (data.secure_url) {

      document.getElementById("imageUrl").value = data.secure_url;

      alert("✅ Image Uploaded Successfully!");

    } else {

      alert("❌ Upload Failed");

      console.log(data);

    }

  } catch (error) {

    alert(error.message);

  }

  btn.disabled = false;
  btn.textContent = "📤 Upload Image";

});

// --------------------
// Save Guide
// --------------------
document.getElementById("saveGuideBtn").addEventListener("click", async () => {

  const brand = document.getElementById("brandName").value.trim();
  const model = document.getElementById("modelName").value.trim();
  const repairType = document.getElementById("repairType").value.trim();
  const imageUrl = document.getElementById("imageUrl").value.trim();
  const videoUrl = document.getElementById("videoUrl").value.trim();

  const tools = document.getElementById("tools").value.trim();
  const parts = document.getElementById("parts").value.trim();
  const repairTime = document.getElementById("repairTime").value.trim();
  const difficulty = document.getElementById("difficulty").value;

  const guide = document.getElementById("guideText").value.trim();

  if (
    !brand ||
    !model ||
    !repairType ||
    !imageUrl ||
    !videoUrl ||
    !tools ||
    !parts ||
    !repairTime ||
    !difficulty ||
    !guide
  ) {

    alert("⚠️ Please fill all fields.");

    return;

  }

  try {

    const q = query(
      collection(db, "guides"),
      where("brand", "==", brand),
      where("model", "==", model),
      where("repairType", "==", repairType)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {

      await updateDoc(snapshot.docs[0].ref, {

        imageUrl,
        videoUrl,
        tools,
        parts,
        repairTime,
        difficulty,
        guide

      });

      alert("✅ Guide Updated Successfully!");

    } else {

      await addDoc(collection(db, "guides"), {

        brand,
        model,
        repairType,
        imageUrl,
        videoUrl,
        tools,
        parts,
        repairTime,
        difficulty,
        guide

      });

      alert("✅ Guide Saved Successfully!");

    }

    document.getElementById("modelName").value = "";
    document.getElementById("repairType").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("videoUrl").value = "";
    document.getElementById("tools").value = "";
    document.getElementById("parts").value = "";
    document.getElementById("repairTime").value = "";
    document.getElementById("difficulty").value = "";
    document.getElementById("guideText").value = "";
    document.getElementById("imageFile").value = "";

  } catch (error) {

    alert(error.message);

  }

});