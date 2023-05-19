import React, { useState } from "react";
import styled from "styled-components";

const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <Button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
            //   className={index <= ((rating && hover) || hover) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </Button>
          );
        })}
      </div>
    );
  };

  export const Button = styled.button `
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    &.on {
        color: #000;
      }
    &.off {
        color: #ccc;
      }
  `;

  export default StarRating;
  