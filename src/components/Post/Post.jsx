import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Post.css'
import PostModal from '../PostModal/PostModal';
const Post = ({ userId }) => {
    const [post, setPost] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((response) => {
            const posts = response.data;
            setPost(posts);
        });
    }, []);

    const openPostModal = (post) => {
        setSelectedPost(post);
    };

    const closePostModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className="card-container">
            {post.map((post) => (
                <div className="card" key={post.id} onClick={() => openPostModal(post)}>
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-body">{post.body}</p>
                </div>
            ))}
            <PostModal post={selectedPost} onClose={closePostModal} />
        </div>
    )
}

export default Post