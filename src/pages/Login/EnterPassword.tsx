import React, { useState } from 'react';
import './bsspeke/apiCalls';
import { oprfRequest, mLoginAuth } from './bsspeke/apiCalls';
import Client from './bsspeke/BSSpekeWrapper';
import { MATRIX_BASE } from '../../services/HttpConstants';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../state-management/auth/store';

// EnterPassword page 
const EnterPassword = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { stages, setEnteredPassword, setServerResponse, setIsLoading, setIsLoggingIn, domainStore } = useAuthStore();
    const navigate = useNavigate();

    // Handles the submit logic and processing of the password
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Different auth flows for different login types - bsspeke and m.login.password
        const client = new Client(stages.userID, domainStore, password);
        console.log("Client: ", client);
        const URL = MATRIX_BASE + domainStore + "/_matrix/client/r0/login";
        if (stages.isBsspeke) {
            oprfRequest({ client, URL: URL, stages, setError, navigate, setEnteredPassword, setServerResponse, setIsLoading, setIsLoggingIn});
        } else {
            mLoginAuth({ stages, URL, setError, navigate, setEnteredPassword, setServerResponse, setIsLoading, setIsLoggingIn}, password);
        }
    }

    return (
        <>
            {stages.isLoggingIn && stages.userID !== "" && !stages.isLoading && !stages.enteredPassword &&
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); }} />
                        <button type="submit">Submit</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>}
        </>
    );
}

export default EnterPassword;