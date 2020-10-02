import React, { useEffect, useState } from 'react';
import chatClient from '../lib/chatClient';
import generateKeyPair from '../lib/generateKeyPair';

export default props => {
    const [keyPair, setKeyPair] = useState(null)
    const [sender, setSender] = useState("")

    useEffect(() => {
        generateKeyPair(setKeyPair)
    }, [])

    const handleClick = () => {
        const logIn = async () => {
            await chatClient.setUser(
                {
                    id: sender,
                    name: sender,
                    image: `https://getstream.io/random_png/?id=cool-recipe-9&name=${sender}`,
                    publicKeyJwk: JSON.stringify(keyPair.publicKeyJwk)
                },
                chatClient.devToken(sender),
            );

            props.onSubmit({sender, keyPair})
        }

        logIn();
    }

    return (
        <div>
            <p>What is your name?</p>
            <input value={sender} onChange={e => setSender(e.target.value)} />
            <br /><br />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}