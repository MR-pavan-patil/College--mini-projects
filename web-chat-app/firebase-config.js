// ============================================
// 🔥 FIREBASE CONFIGURATION - ULTIMATE CHAT
// ============================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// ============================================
// ✅ YOUR FIREBASE CONFIGURATION
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyCSaBdFoN7qR2SYizx8ghdx9URuwgX0OpM",
    authDomain: "ultimatechat-pro.firebaseapp.com",
    projectId: "ultimatechat-pro",
    storageBucket: "ultimatechat-pro.firebasestorage.app",
    messagingSenderId: "1054290820404",
    appId: "1:1054290820404:web:b954e98702ea5293c1b961",
    measurementId: "G-RV6X061JD0"
};

// ============================================
// INITIALIZE FIREBASE
// ============================================

console.log('🔥 Initializing Firebase...');
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log('✅ Firebase initialized successfully!');
console.log('📦 Project ID:', firebaseConfig.projectId);

// Export for use in app.js
export { auth, db, storage };

// ============================================
// 🔒 SECURITY RULES (Copy to Firebase Console)
// ============================================
// 
// FIRESTORE RULES:
// Go to: Firestore Database → Rules tab
// 
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     // Allow read/write for authenticated users
//     match /rooms/{roomId}/messages/{messageId} {
//       allow read: if request.auth != null;
//       allow create: if request.auth != null;
//       allow delete: if request.auth.uid == resource.data.userId;
//     }
//     
//     match /online/{userId} {
//       allow read: if request.auth != null;
//       allow write: if request.auth.uid == userId;
//     }
//     
//     match /users/{userId} {
//       allow read: if request.auth != null;
//       allow write: if request.auth.uid == userId;
//     }
//   }
// }
// 
// ============================================
// 
// STORAGE RULES (Optional - for file uploads):
// Go to: Storage → Rules tab
// 
// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /chat-uploads/{userId}/{fileName} {
//       allow read: if request.auth != null;
//       allow write: if request.auth != null 
//                    && request.auth.uid == userId
//                    && request.resource.size < 5 * 1024 * 1024;
//     }
//   }
// }
// 
// ============================================