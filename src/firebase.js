import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Engine 1: Database (Question Bank & Sync)
const dbConfig = {
  apiKey: "AIzaSyDbgQW6j9PioZbxhylDFr0N_MNEjZP_ajo",
  authDomain: "bpsc-tracker-sync.firebaseapp.com",
  projectId: "bpsc-tracker-sync",
  storageBucket: "bpsc-tracker-sync.firebasestorage.app",
  messagingSenderId: "158025253878",
  appId: "1:158025253878:web:984bf251396b05b8af3dd7"
};

// Engine 2: Massive PDFs (File Storage)
const storageConfig = {
  apiKey: "AIzaSyC5sBc5sdXLUyjP6Mrf_BuEL5F4RFU6DZE",
  authDomain: "bpsc-pdf-f5cfe.firebaseapp.com",
  projectId: "bpsc-pdf-f5cfe",
  storageBucket: "bpsc-pdf-f5cfe.firebasestorage.app",
  messagingSenderId: "1051874125052",
  appId: "1:1051874125052:web:7a474d9c2581ea8f556379"
};

const app = initializeApp(dbConfig);
export const db = getFirestore(app);

const storageApp = initializeApp(storageConfig, 'storageApp');
export const storage = getStorage(storageApp);
