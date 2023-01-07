export default function EditedTrack(props){
    // props.creator and props.fromList can be used to make api call


    return(
    <div>
        <p>Track: {props.title}</p>
        <p>Artist: {props.artist}</p>
        <p>Time: {props.duration}</p>
        <p>Album: {props.album}</p>
        <button>Remove</button>       
    </div>
    )
}