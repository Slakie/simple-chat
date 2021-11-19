import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";
import styles from "../styles/Room.module.css";

function RoomsContainer() {
  const { socket, roomId, rooms, username, setMessages } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    newRoomRef.current.value = "";    
  }

  function handleJoinRoom(key: string) {
    if (socket.disconnected) {
      socket.connect();
    }

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId: key, message: `${username} has joined the room`, username });
  }

  function handleLeaveRoom (key: string) {
    setMessages([]);
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId: key, message: `${username} has left the room`, username });
    socket.disconnect();
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder="Room name" />
        <button className="btn" onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>

      <ul className={styles.roomList}>
        {rooms.map((room) => {
          return (
            <li key={room.id}>
              <button
                className={styles.btnJoin}
                disabled={room.id === roomId && socket.connected}
                title={`Join ${room.name}`}
                onClick={() => handleJoinRoom(room.id)}
              >
                {room.name}
              </button>
              <button 
                disabled={socket.disconnected}
                className={styles.btnLeave} 
                title='Leave the room'
                onClick={() => handleLeaveRoom(room.id)}
              >
                LEAVE
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
