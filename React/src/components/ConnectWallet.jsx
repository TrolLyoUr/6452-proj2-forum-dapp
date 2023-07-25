import React, { useState } from 'react';
import { userLogin } from '../contracts/interactWithContracts';

function ConnectWallet() {
    const [status, setStatus] = useState("Connect Wallet");

    const connectWallet = async () => {
        try {
            setStatus("Connecting...");
            await userLogin();
            setStatus("Wallet Connected");
            console.log("Wallet Connected");
        } catch (error) {
            console.error("Failed to connect wallet", error);
            setStatus("Failed to Connect");
        }
    };

    return (
        <button onClick={connectWallet}>{status}</button>
    );
}

export default ConnectWallet;
