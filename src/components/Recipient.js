import React, { useEffect, useState } from 'react';
import chatClient from '../lib/chatClient';

export default props => {
    const [recipient, setRecipient] = useState("")

    const handleClick = () => {
        const logIn = async () => {
            const usersQuery = await chatClient.queryUsers({ id: recipient });
            const publicKeyJwk = JSON.parse(usersQuery.users[0].publicKeyJwk)
            props.onSubmit({recipient, publicKeyJwk});
        }

        logIn();
    }

    return (
        <div>
            <p>Who do you want to chat with?</p>
            <input value={recipient} onChange={e => setRecipient(e.target.value)} />
            <br /><br />
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}