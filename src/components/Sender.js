import React, { useState } from "react";
import setUser from "../lib/setUser";
import generateKeyPair from "../lib/generateKeyPair";

export default (props) => {
  const [keyPair, setKeyPair] = useState(null);
  const [sender, setSender] = useState("");
  const [error, setError] = useState("");

  const handleKeyPairInputChange = (e) => {
    try {
      const keyPair = JSON.parse(e.target.value);
      setKeyPair(keyPair);
    } catch (e) {
      setError(`Error reading key pair: ${e}`);
      setKeyPair(keyPair);
    }
  };

  const handleGenerateClick = async () => {
    setKeyPair(await generateKeyPair());
  };

  const handleSubmit = () => {
    const work = async () => {
      try {
        await setUser(sender, keyPair);
        props.onSubmit({ sender, keyPair });
      } catch (e) {
        setError(`Error logging in: ${e}`);
      }
    };

    work();
  };

  return (
    <div>
      <p>What is your id?</p>
      <input value={sender} onChange={(e) => setSender(e.target.value)} />
      <p>Avoid spaces and special characters.</p>
      <p>
        Paste your key pair below or <button onClick={handleGenerateClick}>generate</button> a new one.
      </p>
      <input
        value={JSON.stringify(keyPair)}
        onChange={handleKeyPairInputChange}
      />
      <p>
        You need to save this key pair somewhere safe if you want to log in with
        the same user id later.
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>{error}</p>
    </div>
  );
};
