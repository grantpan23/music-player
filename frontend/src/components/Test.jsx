import React from 'react';

function Test() {

    const handleClick = async () => {
        const response = await fetch(`/api/genres`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        console.log(result);
    }

        return (
            <button onClick={handleClick}>
                Genres
            </button>
        );
    }
 
export default Test;