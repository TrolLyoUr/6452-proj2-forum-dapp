import React, { useState } from 'react';
import { createCommunity } from '../contracts/interactWithContracts';

function CreateCommunityForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCommunity(name, description);
            setName("");
            setDescription("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <input type="submit" value="Create Community" />
        </form>
    );
}

export default CreateCommunityForm;
