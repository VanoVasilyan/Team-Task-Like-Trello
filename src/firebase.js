import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnD3iZGb5lpCC5Y_rsVEhMTncehFRtx48",
  authDomain: "task-list-dc4f3.firebaseapp.com",
  projectId: "task-list-dc4f3",
  storageBucket: "task-list-dc4f3.appspot.com",
  messagingSenderId: "447555446541",
  appId: "1:447555446541:web:188b820bba8bfc7f22f244"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };
