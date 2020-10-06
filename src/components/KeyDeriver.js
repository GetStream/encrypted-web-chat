import React, { useEffect, useState } from "react";
import deriveKey from "../lib/deriveKey";

export default (props) => {
  const { sender, recipient, onSubmit } = props;
  const [error, setError] = useState("");

  useEffect(() => {
    const derive = async () => {
      try {
        const derivedKey = await deriveKey(
          recipient.publicKeyJwk,
          sender.keyPair.privateKeyJwk
        );
        onSubmit(derivedKey);
      } catch (e) {
        setError(e.message);
      }
    };

    derive();
  }, [sender, recipient]);

  return (
    <div>
      <p>Deriving key...</p>
      <p>{error}</p>
    </div>
  );
};
