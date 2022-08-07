import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import Board from '../Board/index';

import styles from './home.module.css';

const Home = () => {
  const user = useSelector(selectUser);
  const handleLogout = () => {
    if (window.confirm("Wanna break up with us :(")) {
      auth.signOut();
    }
  };

  return (
    <main className={styles.mainHome}>
      <div className={styles.content}>
        <div className={styles.info}>
          <span>{String(user.name).split("@")[0]}</span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Board />
    </main >
  );
}

export default Home;
