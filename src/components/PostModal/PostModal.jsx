import React, { useEffect } from 'react';
import './PostModal.css';

const PostModal = ({ post, onClose }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains('post-modal')) {
                onClose();
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    if (!post) return null;

    return (
        <div className="post-modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <h1 className="post-title">{post.title}</h1>
                <p className="post-body">{post.body}</p>
            </div>
        </div>
    );
};

export default PostModal;
