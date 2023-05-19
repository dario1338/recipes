import React, {useState, useEffect} from "react";
import { storage } from "./firebase";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const GetImage = () => {
    const imagesListRef = ref(storage, "images/");

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      });
    }, []);
  

    return (
        <div> 
            {imageUrls.map((url) => {
                return <img src={url} />;
            })}
        </div>
    );
}

export default GetImage;