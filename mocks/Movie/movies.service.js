const uuidv4 = require('uuid/v4');

const movies = require('./movies.json');

const commonFind = allMovie => (propertyName, value) => {
    const moviesFounded = allMovie.find(currentMovie=>currentMovie[propertyName] === value);

    if(moviesFounded) {
        return { movies: moviesFounded, message: ''};
    }
    return { movies: moviesFounded, message: `Movie with ${propertyName} property and value : ${value} not found`};
};


const allMovies= ()=>{
    return movies;
};

const findMovieById = (allMovie = movies.data) => id => {
	return commonFind(allMovie)('id', id);
};

const findMoviesByTitleAndAuthor = (allMovie = movies.data) => (title, author) => {
    const moviesFounded = allMovie.filter(
			currentMovie =>
				currentMovie.title === title && currentMovie.author === author
		);

    if(moviesFounded.length === 0) {
        return {
					movies: moviesFounded,
					message: `Movie with title : ${title} and author : ${author} not found`
				};
    }
    return {movies: moviesFounded, message :''};
};

const addNewMovie = findMoviesByTitleAndAuthorFunc => (movies) => {
    let allMovieTemp = movies;
    const { title, author, dematerialized } = movies;

    const existedMovie = findMoviesByTitleAndAuthorFunc(allMovieTemp)(
			title,
			author
		);

    if (existedMovie.movies) {
        allMovieTemp.push({
					id: uuidv4(),
                    title,
                    author,
                    dematerialized
				});
        return allMovieTemp;
    }

    return {
        errorMessage: `This Movie with firstName : ${movies.firstName} and lastName : ${movies.lastName}`
    }
};

module.exports = {
	findMovieById: findMovieById(),
	addNewMovie: addNewMovie(findMoviesByTitleAndAuthor),
	findMoviesByTitleAndAuthor: findMoviesByTitleAndAuthor(),
	allMovies
};
