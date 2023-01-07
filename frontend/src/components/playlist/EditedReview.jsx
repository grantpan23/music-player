export default function EditedReview(props){
    // props.creator and props.fromList can be used to make api call

    return(
        <div>
            <h2>Comment: {props.comment} from {props.name}</h2>
            <p>Rating: {props.rating}</p>
            <p>Time: {props.date}</p>
            <button>Remove</button>
        </div>
    )
}