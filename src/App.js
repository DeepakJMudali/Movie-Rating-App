import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import './App.css';
import MovieSearch from './component/MovieSearch';
import MovieLists from './component/movieLists';
import { Provider } from 'react-redux';
import store from './redux/store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <MovieSearch />
          </header>
          <MovieLists />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
