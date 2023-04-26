import React from "react";
import Slider from "react-slick";

import { useFetch } from "../../hooks/useFetch";
import { BASE_URL } from "../../utility/url";

import "./featuresSlider.css";

const FeaturedSlider = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const sliderSettings = {
    ...settings,
    className: "featured__slider",
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <Slider {...sliderSettings}>
      {loading && <h4>Loading....</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredTours?.map((tour) => (
          <div key={tour._id}>
            <div className="featured__slider__item">
              <img
                className="featured__slider__image"
                src={tour.photo}
                alt={tour.title}
              />
              <h3 className="featured__slider__title">{tour.title}</h3>
            </div>
          </div>
        ))}
    </Slider>
  );
};

export default FeaturedSlider;
