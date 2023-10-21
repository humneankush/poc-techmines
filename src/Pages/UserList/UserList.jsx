import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'
import { useNavigate } from 'react-router-dom';
function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
                const usersData = usersResponse.data;

                const postsResponses = await axios.all(
                    usersData.map((user) =>
                        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                    )
                );
                const usersWithPostsCount = usersData.map((user, index) => ({
                    ...user,
                    postCount: postsResponses[index].data.length,
                }));

                setUsers(usersWithPostsCount);
            } catch (error) {
                console.error('Error fetching user data or posts:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate()


    if (!users) return <>Loading...</>
    return (
        <>
            <div className='user-list'>
                <h1 className='heading'>Directory</h1>
                {users.map((user) => (
                    <div className="user-card" key={user.id} onClick={() => {
                        navigate(`user/${user.id}`, {
                            state: user
                        })
                    }}>
                        <div className="user-info">
                            <h2 className="user-name">Name: {user.name}</h2>
                            <h2 className="user-post-count">{`Posts: ${user.postCount}`}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default UserList;
