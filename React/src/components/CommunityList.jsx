import React, { useState, useEffect } from 'react';
import { getAllCommunities } from '../contracts/VistWithContract';
import { Link } from 'react-router-dom';

const CommunityList = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        loadCommunities();
    }, []);

    const loadCommunities = async () => {
        const loadedCommunities = await getAllCommunities();
        setCommunities(loadedCommunities);
    };

    return (
        <div>
            <h2>Community List</h2>
            {communities.map((community, index) => (
                <div key={index}>
                    <Link to={`/community/${index}`}>
                        <h3>{community.name}</h3>
                    </Link>
                    <p>{community.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CommunityList;
