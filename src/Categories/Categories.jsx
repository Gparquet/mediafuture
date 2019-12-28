import React from 'react';
import { array } from 'prop-types';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import './Categories.scss';

const PropTypes = {
  books: array.isRequired,
  ebooks: array.isRequired,
  albums: array.isRequired,
  movies: array.isRequired
};

const Categories = props => (
  <div className="flex-container">
    <div className="flex-container_book">
      {'Book'}
      <IconButton>
        <Badge badgeContent={props.books.length} color="primary"></Badge>
      </IconButton>
    </div>

    <div className="flex-container_ebook">
      {'eBook'}
      <IconButton>
        <Badge badgeContent={props.ebooks.length} color="primary"></Badge>
      </IconButton>
    </div>

    <div className="flex-container_album">
      {'Album'}
      <IconButton>
        <Badge badgeContent={props.albums.length} color="primary"></Badge>
      </IconButton>
    </div>

    <div className="flex-container_ebook">
      {'Movie'}
      <IconButton>
        <Badge badgeContent={props.movies.length} color="primary"></Badge>
      </IconButton>
    </div>
  </div>
);

Categories.propTypes = PropTypes;

export default Categories;
