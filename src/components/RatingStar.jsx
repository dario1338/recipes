import React , { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

const RatingStar = ({id}) => {

    const [ratings, setRatings] = useState(0);
    const [rated, setRated] = useState(false);
    const [upload, setUpload] = useState(false);

    const postRating = async (data) => {
            const response = await fetch(
                `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/ratings.json`,
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
             setUpload(true);
             return response.json();
    };

    const getRating = async () => {
        const response = await fetch(
            `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/ratings.json?orderBy="recipesId"&equalTo="${id}"`
        );
        const data = await response.json();
        console.log(data);
            
        let sum = 0;
        let count = 0;
        for(let i in data) {
            sum += parseFloat(data[i].rating);
            count++;
        }
        setRatings(sum/count);
    };

    useEffect(() => {
        getRating();
    }, [upload]);

    const handlerRating = (e) => {
        const newValue = e.target.value;
        const data = {
            recipesId: id,
            rating: newValue
        }
        if(!rated){
        postRating(data);
        setRated(true);
        }
    }

    return (
        <div className="ratingStar">
            <Rating
            name="rating"
            value={ratings}
            size="large"
            disabled={rated === true}
            precision={0.5}
            onChange={handlerRating}
            />
        </div>

    );
}

export default RatingStar;
