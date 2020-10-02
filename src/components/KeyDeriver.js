import React, { useEffect, useState } from 'react';
import deriveKey from '../lib/deriveKey';

export default props => {
    const {sender, recipient, onSubmit} = props;

    useEffect(() => {
      const derive = async () => {
          console.log(props);
          const derivedKey = await deriveKey(recipient.publicKeyJwk, sender.keyPair.privateKeyJwk)
          onSubmit(derivedKey);
      }

      derive()
    }, [sender, recipient])

    return (
        <p>Deriving key...</p>
    )
}