import React, { useEffect, useState } from 'react';
import { getCommunity, getPost } from '../contracts/VistWithContract';

function PostList({ communityId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                // Get the community
                const community = await getCommunity(communityId);
                console.log('community', community);

                // Get all posts in the community
                const postsPromises = community.ids.map(getPost);
                const postsData = await Promise.all(postsPromises);

                setPosts(postsData);
                console.log('posts', posts);
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
