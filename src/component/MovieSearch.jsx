import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { setMovieData } from "../redux/movieSlice";

// Function to fetch movie data using the OMDB API
const fetchMovieData = async (title) => {
  const searchUrl = `http://www.omdbapi.com/?apikey=5ee0e60e&t=${title}`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  return data;
};

export default function MovieSearch() {
  const [title, setTitle] = useState(""); // State to capture the movie title
  const dispatch = useDispatch();

  // Use React Query to fetch movie data when title is available
  const { data, status, error, isLoading } = useQuery({
    queryKey: ["movie", title], // Define the query key in object form
    queryFn: () => fetchMovieData(title), // Fetch movie data using the query function
    enabled: !!title, // Only run the query if title is not empty
    onSuccess: (data) => {
      if (data.Response !== "False") {
        // Dispatch the action to store movie data in Redux
        dispatch(setMovieData(data));
      }
    },
    onError: (error) => {
      // Handle query-level errors here
      console.error("Error fetching movie data:", error);
    },
  });

  return (
    <div>
      {/* Search form */}
      <input
        type="text"
        placeholder="Search Movie Name here!"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title as user types
      />

      {/* Show spinner if query is loading */}
      {isLoading && <ClipLoader color="#3498db" loading={isLoading} size={50} />}

      {/* Display Error */}
      {status === "error" && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {/* Display movie data if available */}
      {status === "success" && data?.Response === "True" && (
        <>
          <h1>{data?.Title}</h1>
          <img src={data?.Poster} alt={data?.Title} />
          <p>Released: {data?.Released}</p>
          <p>Director: {data?.Director}</p>
          <p>Actors: {data?.Actors}</p>
          <p>IMDb Rating: {data?.imdbRating}</p>
        </>
      )}

      {/* If movie not found */}
      {status === "success" && data?.Response === "False" && <h2>{data?.Error}</h2>}
    </div>
  );
}
