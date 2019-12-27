const uuidv4 = require('uuid/v4');

const albums = require('./albums.json');

const commonFind = allAlbum => (propertyName, value) => {
    const albumFounded = allAlbum.find(currentAlbum=>currentAlbum[propertyName] === value);

    if(albumFounded) {
        return { album: albumFounded, message: ''};
    }
    return { album: albumFounded, message: `Album with ${propertyName} property and value : ${value} not found`};
};


const allAlbums= ()=>{
    return albums;
};

const findAlbumById = (allAlbum = albums.data) => id => {
	return commonFind(allAlbum)('id', id);
};

const findAlbumsByTitleAndAuthor = (allAlbum = albums.data) => (title, author) => {
    const albumsFounded = allAlbum.filter(
			currentAlbum =>
				currentAlbum.title === title && currentAlbum.author === author
		);

    if(albumsFounded.length === 0) {
        return {
					albums: albumsFounded,
					message: `Album with title : ${title} and author : ${author} not found`
				};
    }
    return {albums: albumsFounded, message :''};
};

const addNewAlbum = findAlbumsByTitleAndAuthorFunc => (album) => {
    let allAlbumTemp = albums;
    const { title, author, dematerialized } = album;

    const existedAlbum = findAlbumsByTitleAndAuthorFunc(allAlbumTemp)(
			title,
			author
		);

    if (existedAlbum.albums) {
        allAlbumTemp.push({
					id: uuidv4(),
                    title,
                    author,
                    dematerialized
				});
        return allAlbumTemp;
    }

    return {
        errorMessage: `This Album with firstName : ${album.firstName} and lastName : ${album.lastName}`
    }
};

module.exports = {
	findAlbumById: findAlbumById(),
	addNewAlbum: addNewAlbum(findAlbumsByTitleAndAuthor),
	findAlbumsByTitleAndAuthor: findAlbumsByTitleAndAuthor(),
	allAlbums
};
