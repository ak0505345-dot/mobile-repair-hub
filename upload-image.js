import { db } from "./firebase.js";
import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const CLOUD_NAME = "dflm2eduw";
const UPLOAD_PRESET = "mobile-repair-hub";

const imageFile = document.getElementById("imageFile");
const previewImage = document.getElementById("previewImage");
const uploadBtn = document.getElementById("uploadBtn");
const uploadStatus = document.getElementById("uploadStatus");
const imageUrl = document.getElementById("imageUrl");
const copyBtn = document.getElementById("copyBtn");

let selectedFile = null;

imageFile.addEventListener("change", () => {

    selectedFile = imageFile.files[0];

    if (!selectedFile) return;

    previewImage.src = URL.createObjectURL(selectedFile);
    previewImage.style.display = "block";

});

uploadBtn.addEventListener("click", async () => {

    if (!selectedFile) {
        alert("Please select an image.");
        return;
    }

    uploadStatus.textContent = "Uploading...";

    const formData = new FormData();

    formData.append("file", selectedFile);
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

        if (!response.ok) {
            throw new Error(data.error.message);
        }

        imageUrl.value = data.secure_url;

        uploadStatus.textContent = "✅ Upload Successful";

    } catch (error) {

        uploadStatus.textContent = error.message;

    }

});

copyBtn.addEventListener("click", async () => {

    if (imageUrl.value === "") {
        alert("No URL available.");
        return;
    }

    await navigator.clipboard.writeText(imageUrl.value);

    alert("Image URL copied!");

});