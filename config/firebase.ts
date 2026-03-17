import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB8drH7p2aU6fjBB4WW2lh4__2GvpOLZPw',
  authDomain: 'unicraft-bd243.firebaseapp.com',
  projectId: 'unicraft-bd243',
  storageBucket: 'unicraft-bd243.firebasestorage.app',
  messagingSenderId: '679226450596',
  appId: '1:679226450596:web:b3d241919db915b88efc31',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
