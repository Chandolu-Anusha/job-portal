function JobCard(props){
    return(
        <div>
            <h2>{props.title}</h2>
            <p>{props.company}</p>
        </div>
    );
}
export default JobCard;