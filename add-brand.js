import { db } from "./firebase.js";
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById("saveBrandBtn").addEventListener("click", async () => {

  const brand = document.getElementById("brandName").value.trim();

  if (brand === "") {
    alert("Brand name likho.");
    return;
  }

  try {
    await addDoc(collection(db, "brands"), {
      name: brand
    });

    alert("✅ Brand Saved Successfully!");

    document.getElementById("brandName").value = "";

  } catch (error) {
    alert(error.message);
  }

});