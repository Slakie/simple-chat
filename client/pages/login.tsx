import Router from "next/router";

import styles from "../styles/Login.module.css";
import { useSockets } from "../context/socket.context";

export default function Login() {
  const { username, setUsername } = useSockets();
  
  function handleSetUsername() {
    fetch('http://localhost:4000/public/login')
      .then(res => res.json())
      .then(({name}) => {
        setUsername(name);
        Router.push('/chat');
      })
  }

  return (
    <>
      {!username && (
        <div className={styles.btnWrapper}>
          <div className={styles.btnOutter}>
            <button className="btn" onClick={handleSetUsername}>
              Get your Name
            </button>
          </div>
        </div>
      )}
    </>
  )
}
