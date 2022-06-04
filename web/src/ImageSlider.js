import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./ImageSlider.css";

function ImageSlider(props) {
  const [current, setCurrent] = useState(0);
  const length = props.images.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(props.images) || props.images.length <= 0) {
    return null;
  }

  return (
    <>
      <section className="imageSlider">
        <FaArrowAltCircleLeft
          className="imageSlider__leftArrow"
          onClick={prevSlide}
        />
        <FaArrowAltCircleRight
          className="imageSlider__rightArrow"
          onClick={nextSlide}
        />
        {props.images.map((slide, index) => {
          return (
            <div
              className={
                index === current
                  ? "imageSlider_activeImg"
                  : "imageSlider__inactiveImage"
              }
              key={index}
            >
              {index === current && (
                <img
                  src={require(`${slide}`)}
                  alt={"product_image_" + index}
                  className="imageSlider__image"
                />
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default ImageSlider;
