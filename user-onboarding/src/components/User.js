import React from 'react';

export default function User({ details }) {
    return (
        <div>
            <h2>{details.name}</h2>
            <p>{details.email}</p>
        </div>
    )
}