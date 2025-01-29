import React from "react"
import './App.css';
import MovieSearch from './component/MovieSearch';
import { Provider } from 'react-redux';
import MovieLists from './component/movieLists';
import store from './redux/store';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <header className="App-header">
      <MovieSearch/>
        </header>
      <MovieLists />
      </Provider>
    </div>
  );
}

export default App;
