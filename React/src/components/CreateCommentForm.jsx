import React, { useState } from 'react';
import { createComment } from '../contracts/interactWithContracts';

function CreateCommentForm() {
    const [commentContent, setCommentContent] = useState("");
    const [postId, setPostId] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // create a comment and handle the response/error
        try {
            const comment = { postId, commentContent };

            // Convert the post to a Blob
            const blob = new Blob([JSON.stringify(comment)], { type: 'application/json' });

            // Create a File object from the Blob
            const files = [new File([blob], 'comment.json')];

            // Upload the File object directly to web3.storage, and then update the contract
            await createComment(postId, files);

            setCommentContent("");
            setPostId(0);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Post ID:
                <input type="number" value={postId} onChange={e => setPostId(e.target.value)} />
            </label>
            <label>
                Comment Content:
                <input type="text" value={commentContent} onChange={e => setCommentContent(e.target.value)} />
            </label>
            <input type="submit" value="Create Comment" />
        </form>
    );
}

export default CreateCommentForm;
