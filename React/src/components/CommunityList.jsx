import React, { useState, useEffect } from 'react';
import { getAllCommunities } from '../contracts/VistWithContract';


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
                    <h3>{community.name}</h3>
                    <p>{community.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CommunityList;
