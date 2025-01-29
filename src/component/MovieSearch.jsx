import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchData } from '../redux/movieSlice';

export default function MovieSearch() {
  const {status} = useSelector(((state)=>state.movieData))
  const [title, setTitle] = useState(''); // State for title
  const dispatch = useDispatch();

  const onFormAction = (formData) => {
    const searchTitle = formData.get("title");
    setTitle(searchTitle); // Update the title state
    const searchUrl = `http://www.omdbapi.com/?apikey=5ee0e60e&t=${searchTitle}`;
   
    dispatch(fetchData(searchUrl)); // Dispatch fetch with the new URL
  };

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onFormAction(formData);
      }}>
        <input 
          placeholder="Search Movie Name here !" 
          id="title" 
          name="title"
          value={title} 
          onChange={(e) => setTitle(e.target.value)} // Update title state as user types
        />
        <input type="submit" name="submit" disabled={status === "loading"}/>
      </form>
    </>
  );
}
