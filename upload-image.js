const CLOUD_NAME = "dflm2eduw";
const UPLOAD_PRESET = "mobile repair hub";

const imageFile = document.getElementById("imageFile");
const uploadBtn = document.getElementById("uploadBtn");
const imageUrl = document.getElementById("imageUrl");
const copyBtn = document.getElementById("copyBtn");

uploadBtn.addEventListener("click", async () => {

  if (!imageFile.files[0]) {
    alert("⚠️ Please select an image.");
    return;
  }

  uploadBtn.disabled = true;
  uploadBtn.textContent = "Uploading...";

  const formData = new FormData();
  formData.append("file", imageFile.files[0]);
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

      imageUrl.value = data.secure_url;

      alert("✅ Image Uploaded Successfully!");

    } else {

      alert("❌ Upload Failed");

      console.log(data);

    }

  } catch (error) {

    alert(error.message);

  }

  uploadBtn.disabled = false;
  uploadBtn.textContent = "📤 Upload Image";

});

copyBtn.addEventListener("click", () => {

  if (imageUrl.value === "") {

    alert("No Image URL");

    return;

  }

  navigator.clipboard.writeText(imageUrl.value);

  alert("✅ URL Copied!");

});