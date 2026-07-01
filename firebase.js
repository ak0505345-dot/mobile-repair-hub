import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  initializeFirestore,
  persistentLocalCache
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCu-U0eW-RgqGDwjIWKnGLhvkuOCJIW7uU",
  authDomain: "mobile-repair-hub-42612.firebaseapp.com",
  projectId: "mobile-repair-hub-42612",
  storageBucket: "mobile-repair-hub-42612.firebasestorage.app",
  messagingSenderId: "913493157421",
  appId: "1:913493157421:web:6707c311a5345f93367aa4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});