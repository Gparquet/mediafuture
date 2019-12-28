import React, { Component } from 'react';
import Categories from './Categories';

class CategoriesContainer extends Component {
  url = 'http://localhost:3001/api';

  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      movies: [],
      books: [],
      ebooks: []
    };
  }

  getAlbums() {
    return fetch(`${this.url}/albums`).then(res => res.json());
  }
  getMovies() {
    return fetch(`${this.url}/movies`).then(res => res.json());
  }

  getBooks() {
    return fetch(`${this.url}/books`).then(res => res.json());
  }

  geteBooks() {
    return fetch(`${this.url}/ebooks`).then(res => res.json());
  }

  componentDidMount() {
    Promise.all([
      this.getAlbums(),
      this.getMovies(),
      this.geteBooks(),
      this.geteBooks()
    ]).then(values => {
      const albums = values[0].data;
      const movies = values[1].data;
      const books = values[2].data;
      const ebooks = values[3].data;
      this.setState({
        albums,
        movies,
        books,
        ebooks
      });
    });
  }

  render() {
    return <Categories {...this.state} />;
  }
}

export default CategoriesContainer;
