import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sender from "./components/Sender";
import Recipient from "./components/Recipient";
import KeyDeriver from "./components/KeyDeriver";

function App() {
  const [sender, setSender] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [derivedKey, setDerivedKey] = useState(null);

  if (!sender) return <Sender onSubmit={setSender} />;

  if (!recipient) return <Recipient onSubmit={setRecipient} />;

  if (!derivedKey)
    return (
      <KeyDeriver
        sender={sender}
        recipient={recipient}
        onSubmit={setDerivedKey}
      />
    );

  return <Chat sender={sender} recipient={recipient} derivedKey={derivedKey} />;
}

export default App;
