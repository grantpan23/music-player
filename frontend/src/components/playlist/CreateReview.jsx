import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"

export default function CreateReview(props) {
  const {state} = useLocation();
//   const [token,setToken] = useState('')
//   const [playlistName, setPlaylistName] = useState('')
//   const [creatorName, setCreatorName] = useState('')
//   const [username,setUsername] = useState('')

    const token = state.token;
    const playlistName = state.playlistName;
    const creatorName = state.creatorName;
    const username = state.username;

  const [rating,setRating] = useState(1);
  const [comment,setComment] = useState('');

  function NumberSelect() {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  }

  const handleSubmit = async(e) => {

    e.preventDefault();
    const confirmSave = window.confirm("Save review?");
    
    if(confirmSave){
        const newReview = {
            "rating": parseInt(rating),
            "comment": comment
        }

        console.log(newReview);
    
        const response = await fetch(`/api/secure/${username}/${playlistName}/${creatorName}/create-review`, { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(newReview)
        })
    
        if(response.status != 200){
            const message = await response.text();
            alert(message);
            return;
        }
        alert('Success')
    }
  }

  return (
    <div>
        <form>
        <div>
            <label>Rating:</label>
            <select onChange={e => setRating(e.target.value)}>{NumberSelect()}</select>
        </div>
        <div>
            <label>
            Comment:
            <input type="text" name="comment" onChange = {e => setComment(e.target.value)}/>
            </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        </form>
        <div>
            <Link to="/main" state={{username:username,token:token}}>back</Link>
        </div>
    </div>
  );
}