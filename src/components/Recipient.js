import React, { useState } from "react";
import chatClient from "../lib/chatClient";

export default (props) => {
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    const logIn = async () => {
      try {
        const usersQuery = await chatClient.queryUsers({ id: recipient });

        if (usersQuery.users.length > 0) {
          const publicKeyJwk = JSON.parse(usersQuery.users[0].publicKeyJwk);
          props.onSubmit({ recipient, publicKeyJwk });
        } else {
          setError(
            "This user is not registered. Open a new tab and create it? :)"
          );
        }
      } catch (e) {
        setError(`Error setting recipient: ${e.message}`);
      }
    };

    logIn();
  };

  return (
    <div>
      <p>Who do you want to chat with?</p>
      <input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <br />
      <br />
      <button onClick={handleClick}>Submit</button>
      <p>{error}</p>
    </div>
  );
};
