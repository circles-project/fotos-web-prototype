import React, { useState } from 'react';
import { LOGIN_URL } from '../../services/HttpConstants';
import useAuthStore from '../../state-management/auth/store';

// EnterUsername page
const EnterUsername = () => {
    const [username, setUsername] = useState('');
    const [domain, setDomain] = useState('');
    const [error, setError] = useState('');
    let user_id = `@${username}:${domain}`
    const { stages, setIsLoading, setUserID, setIsBsspeke, setUserResponse } = useAuthStore();

    // Handles the submit logic and processing of the username
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        fetch(LOGIN_URL, {
            method: "POST",
            body: JSON.stringify({
                "identifier": {
                    "type": "m.id.user",
                    "user": user_id
                }
            }),
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.errcode) {
                    console.log("Error: ", json);
                    setError(json.error);
                } else {
                    setUserID(user_id);
                    setUserResponse(json);
                    if (json.flows[0].stages[0] === "m.login.bsspeke-ecc.oprf" || json.flows.stages[0] === "m.login.bsspeke-ecc.verify") {
                        console.log("BSSPEKE Account Found")
                        setIsBsspeke(true);
                    }
                }

            })
            .catch(error => {
                console.log("Error: " + error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            {stages.isLoggingIn && stages.userID == "" && !stages.isLoading &&
                <>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">@</label>
                        <input type="text" id="username" placeholder="Enter username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value); }} />
                        <label htmlFor="domain">:</label>
                        <input type="text" id="domain" placeholder="Domain" value={domain} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDomain(e.target.value); }} />
                        <button type="submit">Submit</button>
                    </form>
                    {error && <p>{error}</p>}
                </>}
        </>
    );
}

export default EnterUsername;