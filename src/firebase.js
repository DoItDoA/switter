import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth"; // 파이어베이스 인증
import { getFirestore } from "firebase/firestore"; // 파이어베이스 데이터베이스
import { getStorage } from "firebase/storage"; // 파이어베이스 이미지 저장할 장소

// .env에 값을 옮겨 github에 저장 방지
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}; // Your web app's Firebase configuration

initializeApp(firebaseConfig); // Initialize Firebase

export const authService = getAuth(); // 인증하여 유저정보 가져오기
export const dbService = getFirestore(); //파이어스토어 정보 가져오기
export const storageService = getStorage(); // 스토리지 정보 가져오기
