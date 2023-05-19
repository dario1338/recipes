import React , { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useParams} from "react-router-dom";

import { auth } from "./firebase";
import { useAuthState} from "react-firebase-hooks/auth";

const CommentBox = ({id}) => {

    const [user, loading] = useAuthState(auth);
    const params = useParams();

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [buttonText, setButtonText] = useState("Show Comments");

    const postComment = async (data) => {
        const response = await fetch(
            `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/comments.json`,
            {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
            }
        );
        getComments();
            //  setUpload(true);
        return response.json();
    };

    const getComments = async () => {
        const response = await fetch(
            `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/comments.json?orderBy="recipeId"&equalTo="${id}"`
        );
        const data = await response.json();
        console.log(data); 

        const res = [];
        for(let i in data) {
            res.push([i, data[i]]);
        }
        // console.log(res);
        setComments(res);
    };

    useEffect(() => {
        getComments();
    },[]);

    const getCommentsTitle = (commentCount) => {
        if (commentCount === 0) {
            return 'No comments yet';
          } else if (commentCount === 1) {
            return "1 comment";
          } else {
            return `${commentCount} comments`;
          }
    };

    const handleClick = () => {
        setShowComments(!showComments);
    };

    
    useEffect(() => {
        if(showComments){
            setButtonText("Hide Comments");
        }else {
            setButtonText("Show Comments");
        }
    },[showComments]);

    return (
        <div className="comment-box">
            <h2>Join the Discussion!</h2>
            {user && (  
            <CommentForm postComment={postComment} setComments={setComments} user={user} recipeId={params.id}/>
            )}
            <button id="comment-reveal" onClick={handleClick}>{buttonText}</button>
            <h3>Comments</h3>
            <h4>{getCommentsTitle(comments.length)}</h4>
            {showComments && <div className="comment-list">{comments.map((comment) => {
                return (
                    <Comment author={comment[1].author} body={comment[1].comment} key={comment[0]}/>
                )
            })}</div>}
            {/* {!showComments && setButtonText("Show Comments")} */}
        </div>
    );
}

export default CommentBox;