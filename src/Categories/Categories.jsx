import React, { Component } from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import './Categories.scss';
class Categories extends Component {
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
    return (
      <div className="flex-container">
        <div className="flex-container_book">
          {'Book'}
          <IconButton>
            <Badge
              badgeContent={this.state.books.length}
              color="primary"
            ></Badge>
          </IconButton>
        </div>

        <div className="flex-container_ebook">
          {'eBook'}
          <IconButton>
            <Badge
              badgeContent={this.state.ebooks.length}
              color="primary"
            ></Badge>
          </IconButton>
        </div>

        <div className="flex-container_album">
          {'Album'}
          <IconButton>
            <Badge
              badgeContent={this.state.albums.length}
              color="primary"
            ></Badge>
          </IconButton>
        </div>

        <div className="flex-container_ebook">
          {'Movie'}
          <IconButton>
            <Badge
              badgeContent={this.state.movies.length}
              color="primary"
            ></Badge>
          </IconButton>
        </div>
      </div>
    );
  }
}

export default Categories;
