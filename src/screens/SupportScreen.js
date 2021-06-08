import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { isSeller } from "../../../estorebackendfix/utils";

let allUsers = [];
let allMessages = [];
let allSelectedUsers = {};
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:3005"
    : window.location.host;

export default function SupportScreen() {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: smooth,
      });

      if (!socket) {
        const sk = socketIOClient(ENDPOINT);
        setSocket(sk);
      }

      sk.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      sk.on("message", (data) => {
        if (allSelectedUsers._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on("updateUser", (updateUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on("selectUser", (user) => {
        allMessages - user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);

  return (
    <div className="row top full-container">
      <div className="col-1 support-users">
        {users.filter((x) => x._id !== userInfo._id).length === 0 && (
          <MessageBox> No users online </MessageBox>
        )}

        <ul>
          {users
            .filter((x) => x._id !== userInfo._id)
            .map((user) => (
              <li
                key={user._id}
                className={user._id === selectedUser._id ? "Selected" : ""}
              >
                <button
                  className="block"
                  type="button"
                  onClick={() => selectedUser(user)}
                >
                  {user.name}
                </button>
                <span
                  className={
                    user.unread ? "unread" : user.online ? "online" : "offline"
                  }
                ></span>
              </li>
            ))}
        </ul>
      </div>

      <div className="col-3 support-messages">
        {!selectedUser._id ? (
          <MessageBox> Select a user to start chatting </MessageBox>
        ) : (
          <div>
            <div className="row">
              <strong> Chat with {selectedUser.name}</strong>
            </div>
            <ul ref={uiMessagesRef}>
              {messages.length === 0 && <li> No Messages </li>}
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong> {`${msg.name}:`}</strong> {msg.body}
                </li>
              ))}
            </ul>

            <div>
              <form onSubmit={submitHandler} className="row">
                <input
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type="text"
                  placeholder="enter message"
                ></input>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
