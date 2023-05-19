import React, {useState, useEffect} from "react";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [preparation, setPreparation] = useState("");

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [videoUpload, setVideoUpload] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const navigate = useNavigate();

    const [ingredient, setIngredient] = useState("");

    const handleChangeRadio = (event) => {
        setCategory(event.target.value);
    }

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`); // + v4()
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrl(url);
    
          });
        });
    };

    const uploadVideo = () => {
        if (videoUpload == null) return;
        const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`); // + v4()
        uploadBytes(videoRef, videoUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setVideoUrl(url);
    
          });
        });
    };

    const addRecipe = async (data) => {
        const response = await fetch(
            `https://recipesdb-48420-default-rtdb.europe-west1.firebasedatabase.app/recipes.json`,
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
            //  setUpload(true);
        return response.json();
    };

    const addIngredient = () => {
        setIngredients((prev) => [...prev, ingredient]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            title: title,
            category: category,
            ingredients: ingredients,
            preparation: preparation,
            picture: imageUrl,
            video: videoUrl
        }
        console.log(data);
        addRecipe(data);

        // navigate("/");
        setTimeout(() => {navigate("/");}, 1000);
    }

    return (
        <div className="add-recipe">
            <input className="input-title" placeholder="Title:" onChange={(event) => {setTitle(event.target.value);}} />
            <div>
                <input className="input-ingredients" placeholder="Ingredients:" onChange={(event) => {setIngredient(event.target.value);}} />
                {/* <button onClick={addIngredient}>Add Ingredient</button> */}
            </div>
            <button onClick={addIngredient}>Add Ingredient</button>
            <input className="input-preparation" placeholder="Preparation:" onChange={(event) => {setPreparation(event.target.value);}} />
            <div>
            <input className="upload-picture"
                type="file"
                onChange={(event) => {
                setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadFile}> Upload Image</button>
            </div>
            <div>
            <input className="upload-video"
                type="file"
                onChange={(event) => {
                setVideoUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadVideo}> Upload Video</button>
            </div>

            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group"><h3>Choose Category</h3></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={value}
                    onChange={handleChangeRadio}
                >
                    <FormControlLabel value="Jelo" control={<Radio />} label="Jelo" />
                    <FormControlLabel value="Salata" control={<Radio />} label="Salata" />
                    <FormControlLabel value="Deserti" control={<Radio />} label="Deserti" />
                </RadioGroup>
            </FormControl>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default AddRecipe;