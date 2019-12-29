import React, { useState, useEffect } from 'react';
import Categories from './Categories';

const url = 'http://localhost:3001/api';

const getAlbums = () => {
  return fetch(`${url}/albums`).then(res => res.json());
};
const getMovies = () => {
  return fetch(`${url}/movies`).then(res => res.json());
};

const getBooks = () => {
  return fetch(`${url}/books`).then(res => res.json());
};

const geteBooks = () => {
  return fetch(`${url}/ebooks`).then(res => res.json());
};

const CategoriesContainer = () => {
  const [state, setState] = useState({
    albums: [],
    movies: [],
    books: [],
    ebooks: []
  });

  useEffect(() => {
    Promise.all([getAlbums(), getMovies(), getBooks(), geteBooks()]).then(
      values => {
        const albums = values[0].data;
        const movies = values[1].data;
        const books = values[2].data;
        const ebooks = values[3].data;
        setState({
          albums,
          movies,
          books,
          ebooks
        });
      }
    );
  });
  return <Categories {...state} />;
};

export default CategoriesContainer;
