import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const brandList = document.getElementById("brandList");
const brandCount = document.getElementById("brandCount");
const searchBrand = document.getElementById("searchBrand");

let brands = [];

async function loadBrands() {

  try {

    const snapshot = await getDocs(collection(db, "brands"));

    brands = [];

    snapshot.forEach((docSnap) => {

      brands.push({
        id: docSnap.id,
        ...docSnap.data()
      });

    });

    displayBrands(brands);

  } catch (error) {

    brandList.innerHTML =
      "<p>❌ Failed to load brands.</p>";

    console.log(error);

  }

}

function displayBrands(list) {

  brandCount.textContent = list.length;

  if (list.length === 0) {

    brandList.innerHTML =
      "<p>No brands found.</p>";

    return;

  }

  brandList.innerHTML = "";

  list.forEach((brand) => {

    brandList.innerHTML += `

      <div class="card">

        <h3>${brand.name}</h3>

        <button onclick="deleteBrand('${brand.id}')">

          🗑 Delete

        </button>

      </div>

    `;

  });

}

searchBrand.addEventListener("input", () => {

  const keyword = searchBrand.value.toLowerCase();

  const filtered = brands.filter((item) =>
    item.name.toLowerCase().includes(keyword)
  );

  displayBrands(filtered);

});

window.deleteBrand = async (id) => {

  if (!confirm("Delete this brand?")) return;

  try {

    await deleteDoc(doc(db, "brands", id));

    alert("✅ Brand deleted!");

    loadBrands();

  } catch (error) {

    alert(error.message);

  }

};

loadBrands();