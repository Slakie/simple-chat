import styles from "../styles/Chat.module.css";
import RoomsContainer from "../containers/Rooms";
import MessagesContainer from "../containers/Messages";

export default function Chat() {
  return (
    <div className={styles.container}>
      <RoomsContainer />
      <MessagesContainer />
    </div>
  )
}