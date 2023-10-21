import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import axios from 'axios';
import { formatTimestampToClock } from '../../utils/utility';
import { useLocation, useNavigate } from 'react-router-dom';
import Post from '../../components/Post/Post';
const UserProfile = () => {
    const { state: user } = useLocation();
    const [selectedCountry, setSelectedCountry] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [isClockRunning, setIsClockRunning] = useState(true);
    const [country, setCountry] = useState([])
    const navigate = useNavigate()
    let intervalId;

    const updateClock = () => {
        let apiUrl = 'http://worldtimeapi.org/api/ip';
        if (selectedCountry) {
            apiUrl = `http://worldtimeapi.org/api/timezone/${selectedCountry}`;
        }
        axios
            .get(apiUrl)
            .then((response) => {
                const timeData = response.data;
                setCurrentTime(timeData.datetime);
            })
            .catch((error) => {
                console.error('Error fetching current time:', error);
            });
    };

    useEffect(() => {
        axios.get('http://worldtimeapi.org/api/timezone').then((response) => {
            const countries = response.data;
            setCountry(countries);
        });
        if (isClockRunning) {
            intervalId = setInterval(updateClock, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [selectedCountry, isClockRunning]);

    const toggleClock = () => {
        setIsClockRunning((prevIsClockRunning) => !prevIsClockRunning);
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <button onClick={goBack}>Back</button>
            <div className='country-detail'>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value="">Select a Country</option>
                    {country.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <div className="clock">
                    <p>Current Time: {formatTimestampToClock(currentTime)}</p>
                </div>
                <button onClick={toggleClock}>{isClockRunning ? 'Pause' : 'Start'}</button>
            </div>
            <div>
                <h1 className='heading'>Profile Page</h1>
                <div className='profile-detail'>
                    <span>
                        <h3 >{user.name}</h3>
                        <h3 id='name'> {user.username} | {user.company.catchPhrase}</h3>
                    </span>
                    <span>
                        <h3 htmlFor="address">{`${user.address.suite}  ${user.address.street} ${user.address.city} `}</h3>
                        <h3 id='address'> {user.email} | {user.phone}</h3>
                    </span>
                </div>
            </div>
            <Post userId={user.id} />
        </>

    )
}

export default UserProfile