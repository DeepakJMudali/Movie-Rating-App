import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { setMovieData } from "../redux/movieSlice";

// Function to fetch movie data using the OMDB API
const fetchMovieData = async (title) => {
  const searchUrl = `http://www.omdbapi.com/?apikey=5ee0e60e&t=${title}`;
  const response = await fetch(searchUrl);
  return response.json();
};

export default function MovieSearch() {
  const [title, setTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState(""); 
  const dispatch = useDispatch();


  const { data, status, error, isLoading } = useQuery({
    queryKey: ["movie", searchTitle],
    queryFn: () => fetchMovieData(searchTitle), 
    enabled: !!searchTitle, // Runs query only when searchTitle has a value
    onSuccess: (data) => {
      if (data.Response !== "False") {
        dispatch(setMovieData(data)); 
      }
    },
    onError: (error) => {
      console.error("Error fetching movie data:", error);
    },
  });

  return (
    <div>

      <input
        type="text"
        placeholder="Search Movie Name here!"
        value={title}
        onChange={(e) => setTitle(e.target.value)} 
      />
 
      <button onClick={() => setSearchTitle(title)} disabled={!title || isLoading}>
        Search
      </button>
      {isLoading && <ClipLoader color="#3498db" loading={isLoading} size={50} />}
      {status === "error" && <p style={{ color: "red" }}>Error: {error.message}</p>}


      {status === "success" && data?.Response !== "False" && (
        <>
          <h1>{data?.Title}</h1>
          <img src={data?.Poster} alt={data?.Title} />
          <p>Released: {data?.Released}</p>
          <p>Director: {data?.Director}</p>
          <p>Actors: {data?.Actors}</p>
          <p>IMDb Rating: {data?.imdbRating}</p>
        </>
      )}


      {status === "success" && data?.Response === "False" && <h2>{data?.Error}</h2>}
    </div>
  );
}
