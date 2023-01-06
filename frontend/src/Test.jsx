import React from 'react';

function Test() {

    const testGenres = async () => {
        const response = await fetch(`/api/genres`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        console.log(result);
    }

    const testPublicPlaylists = async () => {
        const response = await fetch(`/api/open/public-playlists`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        const result = await response.json();
        console.log(result);
    }

        return (
            <div>
                <button onClick={testGenres}>
                    Genres
                </button>
                <button onClick={testPublicPlaylists}>
                    Public Playlists
                </button>
            </div>
        );
    }
 
export default Test;