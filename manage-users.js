import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const userList = document.getElementById("userList");
const searchBox = document.getElementById("searchBox");

let allUsers = [];

async function loadUsers() {

  try {

    const snapshot = await getDocs(collection(db, "users"));

    allUsers = [];

    snapshot.forEach((doc) => {

      allUsers.push(doc.data());

    });

    showUsers(allUsers);

  } catch (error) {

    userList.innerHTML = "<h3>" + error.message + "</h3>";

  }

}

function showUsers(users) {

  userList.innerHTML = "";

  if (users.length === 0) {

    userList.innerHTML = "<h3>No Users Found</h3>";
    return;

  }

  users.forEach((user) => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>👤 ${user.fullname || "No Name"}</h3>
      <p>📧 ${user.email}</p>
      <p>📅 ${user.createdAt || "Not Available"}</p>
    `;

    userList.appendChild(card);

    userList.appendChild(document.createElement("br"));

  });

}

searchBox.addEventListener("input", () => {

  const text = searchBox.value.toLowerCase();

  const filtered = allUsers.filter(user =>

    (user.fullname || "").toLowerCase().includes(text) ||
    (user.email || "").toLowerCase().includes(text)

  );

  showUsers(filtered);

});

loadUsers();