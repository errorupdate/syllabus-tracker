import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbgQW6j9PioZbxhylDFr0N_MNEjZP_ajo",
  authDomain: "bpsc-tracker-sync.firebaseapp.com",
  projectId: "bpsc-tracker-sync",
  storageBucket: "bpsc-tracker-sync.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const storageRef = ref(storage, `pdfs/Operating System 02 Class Notes.pdf`);
getDownloadURL(storageRef)
  .then(url => {
    console.log("SUCCESS");
    console.log(url);
    process.exit(0);
  })
  .catch(err => {
    console.error("ERROR", err);
    process.exit(1);
  });
