import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import Home from "../Home/index";

import styles from './app.module.css';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    isRegister ? handleLogin() : handleRegister();
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            id: authUser.uid,
            name: authUser.displayName ? authUser.displayName : authUser.email,
            lastsignIn: authUser.metadata.lastSignInTime,
            verified: String(authUser.emailVerified),
            pic: authUser.photoURL
              ? authUser.photoURL
              : "https://lh3.googleusercontent.com/ogw/ADea4I5bHBJbpIvco4Yh1ARth7_gu4dl_QnpyDAU0NW8=s32-c-mo",
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const handleLogin = () => {
    if (email && password !== "") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => alert("Logged in successfully!!!"))
        .catch((err) => alert(err));
    }
  };
  const handleRegister = () => {
    if (email && password !== "") {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => alert("Registered Successfully"))
        .catch((err) => alert(err));
    }
  };

  return (
    <div>
      {user ? (
        <Home />
      ) : (
        <div className={styles.loginPart}>
          <div className={`${styles.form}`}>
            <form onSubmit={handleSubmit}>
              <h3>{isRegister ? "Login" : "Register"}</h3>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required={true}
                placeholder="Enter your email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required={true}
                placeholder="Enter your password"
              />
              <button type="submit">
                Done
              </button>
              <p>
                {isRegister ? "New member? " : "Already registered? "}
                <span onClick={() => setIsRegister((show) => !show)}>
                  {isRegister ? "Register" : "Login"}
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
