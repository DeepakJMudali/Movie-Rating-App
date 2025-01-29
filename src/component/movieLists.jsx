import React from 'react'
import { useSelector } from 'react-redux'

export default function MovieLists() {

  const { movieData, status, error } = useSelector((state) => state.movieData)

  return (
    <div>
 
      {status === 'loading' && <p>Loading...</p>}

      {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}

      {status === 'succeeded' && movieData?.Response !== 'False' && (
        <>
          <h1>{movieData?.Title}</h1>
          <img src={movieData?.Poster} alt={movieData?.Title} />
          <p>Released Year: {movieData?.Released}</p>
          <p>Director: {movieData?.Director}</p>
          <p>Actors: {movieData?.Actors}</p>
          <p>IMDb Rating: {movieData?.imdbRating}</p>
        </>
      )}

      {status === 'succeeded' && movieData?.Response === 'False' && (
        <h2>{movieData?.Error}</h2>
      )}
    </div>
  )
}
