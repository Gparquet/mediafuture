import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { load } from './Categories.action';

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

export const mapStateToProps = state => ({
  ...state.CategorieReducer
});

export const mapDispatchToProps = dispatch => ({
  onLoad: values => dispatch(load(values))
});

const CategoriesContainer = props => {
  const { onLoad } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([getAlbums(), getMovies(), getBooks(), geteBooks()]).then(
      values => {
        dispatch(onLoad(values));
      }
    );
  });
  return <Categories {...props.categories} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesContainer);
