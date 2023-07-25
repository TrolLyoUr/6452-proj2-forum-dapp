import React, { useState } from 'react';
import { createPost, getCommunityId } from '../contracts/interactWithContracts';

function CreatePostForm() {
    const [community, setCommunity] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const communityId = await getCommunityId(community);
            const post = { communityId, content };

            // Convert the post to a Blob
            const blob = new Blob([JSON.stringify(post)], { type: 'application/json' });

            // Create a File object from the Blob
            const files = [new File([blob], 'post.json')];

            // Upload the File object directly to web3.storage, and then update the contract
            await createPost(communityId, files);

            setCommunity("");
            setContent("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Community:
                <input type="text" value={community} onChange={e => setCommunity(e.target.value)} />
            </label>
            <label>
                Content:
                <textarea value={content} onChange={e => setContent(e.target.value)} />
            </label>
            <input type="submit" value="Create Post" />
        </form>
    );
}

export default CreatePostForm;
