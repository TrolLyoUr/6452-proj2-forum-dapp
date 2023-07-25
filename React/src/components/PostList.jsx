import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from '../contracts/VistWithContract';

function PostList({ communityId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const communityId = 1;
                const postsData = await fetchAllPosts(communityId);

                setPosts(postsData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchPosts();
    }, [communityId]);

    return (
        <div>
            <h2>Posts</h2>
            {posts.map((post, index) => (
                <div key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>Posted by {post.owner}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;
