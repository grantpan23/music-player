
export default function PlayBtn(props){
    const search=props.searchKey.replace(/ /g,"+")

    return(
        <a href={`https://www.youtube.com/results?search_query=${search}`} target="_blank">Play Btn</a>
    )
}