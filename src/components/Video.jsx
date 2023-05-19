import React from "react";

const Video = (props) => {
    {console.log(props.url)}
    const videoUrl = props.url;
    return(
        
        <video loop autoplay="muted" controls width="500" height="350">
            <source src={videoUrl} type="video/mp4"/>
        </video>
    );
}

export default Video;
