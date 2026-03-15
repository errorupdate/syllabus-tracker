import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbgQW6j9PioZbxhylDFr0N_MNEjZP_ajo",
  authDomain: "bpsc-tracker-sync.firebaseapp.com",
  projectId: "bpsc-tracker-sync",
  storageBucket: "bpsc-tracker-sync.firebasestorage.app",
  messagingSenderId: "158025253878",
  appId: "1:158025253878:web:984bf251396b05b8af3dd7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
