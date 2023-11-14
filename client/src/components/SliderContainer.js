import React from "react";
import styled from "styled-components";
import MovieSlider from "./MovieSlider";

const SliderContainer = ({ movies }) => {
  const getMovieBetween = (start, end) => {
    return movies.slice(start, end);
  };
  return (
    <SliderWrapper>
      <MovieSlider data={getMovieBetween(0, 10)} title="Only On Netflix" />
      <MovieSlider data={getMovieBetween(10, 20)} title="Trending Now" />
      <MovieSlider data={getMovieBetween(20, 30)} title="Action Movies" />
      <MovieSlider data={getMovieBetween(30, 40)} title="Romantic Movies" />
      <MovieSlider data={getMovieBetween(40, 50)} title="Epic" />
      <MovieSlider data={getMovieBetween(60, 70)} title="New Releases" />
      <MovieSlider data={getMovieBetween(70, 80)} title="Comedy" />
    </SliderWrapper>
  );
};
const SliderWrapper = styled.div``;
export default SliderContainer;
