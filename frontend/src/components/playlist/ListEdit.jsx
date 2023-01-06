export default function ListEdit(props){
    return(
        <div>
            {props.tracks}
            {props.comments}
            <button onClick={(e)=>{props.edit()}}>Go back</button>
        </div>
    )
}