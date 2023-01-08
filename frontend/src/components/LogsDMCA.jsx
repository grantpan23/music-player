import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function LogsDMCA(){

    const { state } = useLocation();

    const [username,setUsername] = useState('')
    const [token,setToken] = useState('')

    const [playlistName,setPlaylistName] = useState('')
    const [creatorName,setCreatorName] = useState('')
    const [reviewerName,setReviewerName] = useState('')
    const [reviewDateTime,setReviewDateTime] = useState('')
    const [logDate,setLogDate] = useState('')
    const [logText,setLogText] = useState('')
    const [logType,setLogType] = useState('Request')

    useEffect(() =>{
        setUsername(state.username);
        setToken(state.token);
        console.log(state.username)
        console.log(state.token)
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const log = {
            "playlistName": playlistName,
            "creatorName": creatorName,
            "reviewerName": reviewerName,
            "reviewDateTime": reviewDateTime,
            "logText": logText,
            "logDate": logDate
        }

        Object.keys(log).forEach(i =>{
            if(!log[i]){
                alert('All fields required')
                return;
            }
        })

        const response = await fetch(`/api/admin/${username}/log/${logType}`, { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(log)
        })

        if(response.status != 200){
            const message = await response.text();
            alert(message);
            return;
        }

        alert('Log recorded')
    }

    return (
        <div>
            <a href="https://docs.google.com/document/d/10yT6Xf7o7A9AZyRMmYibHsVcIpJBZxydM4JtAV04T7U/edit?usp=sharing" target = "_blank">How to use</a>
            <form>
            <div>
                <label>Log type:</label>
                <select onChange = {e => setLogType(e.target.value)}>
                    <option value="Request">Request</option>
                    <option value="Notice">Notice</option>
                    <option value="Dispute">Dispute</option>
                </select>
            </div>
            <div>
                <label>
                Playlist Name:
                <input type="text" name="playlistName" onChange= {e => setPlaylistName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                Playlist Creator Name:
                <input type="text" name="creatorName" onChange = {e => setCreatorName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                Reviewer Name:
                <input type="text" name="reviewerName" onChange = {e => setReviewerName(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                Review Date & Time:
                <input type="text" name="reviewDateTime" onChange = {e => setReviewDateTime(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                Log Date:
                <input type="text" name="logDate" onChange = {e => setLogDate(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                Log Text:
                <input type="text" name="logText" onChange = {e => setLogText(e.target.value)}/>
                </label>
            </div>
            <button onClick = {e => handleSubmit(e)}>Submit</button>
            </form>
            <div>
                <Link to="/admin" state={{username:username,token:token}}>back</Link>
            </div>
        </div>
      );
}