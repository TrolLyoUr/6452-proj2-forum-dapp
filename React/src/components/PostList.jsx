import React, { useEffect, useState } from 'react';
import { fetchPostsByCommunity, fetchCommentsByPost } from '../contracts/VistWithContract';
import { useParams } from 'react-router-dom';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [showComments, setShowComments] = useState({});
    const { communityId } = useParams();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const postsData = await fetchPostsByCommunity(communityId);
                setPosts(postsData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchPosts();
    }, [communityId]);

    const handleShowComments = async (postId) => {
        if (!comments[postId]) {
            const postComments = await fetchCommentsByPost(postId);
            setComments(prev => ({
                ...prev,
                [postId]: postComments,
            }));
        }

        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    return (
        <div>
            <h2>Posts</h2>
            {posts.map((post, index) => (
                <div key={index}>
                    <h3>{index}</h3>
                    <p>{post.content}</p>
                    <p>Posted by {post.owner}</p>
                    <button onClick={() => handleShowComments(post.id)}>
                        {showComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    {showComments[post.id] && comments[post.id] && (
                        <div>
                            <h3>Comments:</h3>
                            {comments[post.id].map((comment, idx) => (
                                <><p key={idx}>{comment.commentContent} </p><p>comment by {comment.owner}</p></>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;
