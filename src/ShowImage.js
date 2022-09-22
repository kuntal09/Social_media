import React from "react";

function ShowImage(props){
    return(
        <img src={props.myImage} style={{width:"55vw"}}></img>
    )
}

export default ShowImage;