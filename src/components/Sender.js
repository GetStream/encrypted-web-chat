import React, { useEffect, useState } from 'react';
import chatClient from '../lib/chatClient';
import generateKeyPair from '../lib/generateKeyPair';

export default props => {
    const [keyPair, setKeyPair] = useState(null)
    const [sender, setSender] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = () => {
        const logIn = async () => {
            const response = await chatClient.setUser(
                {
                    id: sender,
                    name: sender,
                    image: `https://getstream.io/random_png/?id=cool-recipe-9&name=${sender}`,
                },
                chatClient.devToken(sender),
            );

            if (response.me?.publicKeyJwk && response.me.publicKeyJwk != JSON.stringify(keyPair.publicKeyJwk)) {
                setError("This user id already exists with a different key pair. Choose a new user id or paste the correct key pair.")
                await chatClient.disconnect();
                return
            }

            await chatClient.upsertUsers([{id: sender, publicKeyJwk: JSON.stringify(keyPair.publicKeyJwk)}])

            props.onSubmit({sender, keyPair})
        }

        logIn();
    }

    const handleKeyPairInputChange = (e) => {
        try {
            const keyPair = JSON.parse(e.target.value)
            setKeyPair(keyPair)
        } catch(e) {
            setError(`Error reading key pair: ${e}`)
            setKeyPair(keyPair)
        }
    }

    return (
        <div>
            <p>What is your id?</p>
            <input value={sender} onChange={e => setSender(e.target.value)} />
            <p>Avoid spaces and special characters.</p>
            <p>Paste your key pair below or <button onClick={() => generateKeyPair(setKeyPair)}>generate</button> a new one.</p>
            <input value={JSON.stringify(keyPair)} onChange={handleKeyPairInputChange} />
            <p>You need to save this key pair somewhere safe if you want to log in with the same user id later.</p>
            <button onClick={handleSubmit}>Submit</button>
            <p>{error}</p>
        </div>
    )
}