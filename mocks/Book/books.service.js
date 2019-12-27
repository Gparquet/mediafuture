const uuidv4 = require('uuid/v4');

const books = require('./books.json');

const commonFind = allBook => (propertyName, value) => {
    const bookFounded = allBook.find(currentBook=>currentBook[propertyName] === value);

    if(bookFounded) {
        return { book: bookFounded, message: ''};
    }
    return { book: bookFounded, message: `Book with ${propertyName} property and value : ${value} not found`};
};


const allBooks= ()=>{
    return books;
};

const allEBooks = () => {
	return {
		data: books.data.filter(b => b.dematerialized === true)
	};
};

const findBookById = (allBook = books.data) => id => {
	return commonFind(allBook)('id', id);
};

const findBooksByTitleAndAuthor = (allBook = books.data) => (title, author) => {
    const booksFounded = allBook.filter(
			currentBook =>
				currentBook.title === title && currentBook.author === author
		);

    if(booksFounded.length === 0) {
        return {
					books: booksFounded,
					message: `Book with title : ${title} and author : ${author} not found`
				};
    }
    return {books: booksFounded, message :''};
};

const addNewBook = findBooksByTitleAndAuthorFunc => (book) => {
    let allBookTemp = books;
    const { title, author, dematerialized } = book;

    const existedBook = findBooksByTitleAndAuthorFunc(allBookTemp)(
			title,
			author
		);

    if (existedBook.books) {
        allBookTemp.push({
					id: uuidv4(),
                    title,
                    author,
                    dematerialized
				});
        return allBookTemp;
    }

    return {
        errorMessage: `This Book with firstName : ${book.firstName} and lastName : ${book.lastName}`
    }
};

module.exports = {
	findBookById: findBookById(),
	addNewBook: addNewBook(findBooksByTitleAndAuthor),
	findBooksByTitleAndAuthor: findBooksByTitleAndAuthor(),
    allBooks,
    allEBooks
};
