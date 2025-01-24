// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import config from './config';

const firebaseConfig = {
  apiKey: config.firebase_api_key,
  authDomain: config.firebase_auth_domain,
  projectId: config.firebase_project_id,
  storageBucket: config.firebase_storage_bucket,
  messagingSenderId: config.firebase_messagingSenderId,
  appId: config.firebase_app_id,
  measurementId: config.firebase_measurement_id
};

// Initialize Firebase
const firebaseInstance = initializeApp(firebaseConfig);
export default firebaseInstance;