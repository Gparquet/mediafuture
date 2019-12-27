const express = require('express');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const fs = require('file-system');
const albumService = require('./Album/albums.service');
const movieService = require('./Movie/movies.service');
const bookService = require('./Book/books.service');

const port = 3001;
const app = express();
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const apiRoutes = express.Router();
const mockUrl = process.env.MOCKS_URL;

if (mockUrl) {
	app.use(
		proxy({
			target: mockUrl,
			changeOrigin: true,
			secure: false,
			ws: true,
			xfwd: true
		})
	);
} else {
	app.use('/api', apiRoutes);
	apiRoutes.route('/test').get((req, res) => {
		res.send('Mocks are running');
	});
	apiRoutes
		.route('/albums')
		.get((req, res) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			setTimeout(() => {
				res.send(albumService.allAlbums());
			}, 200);
		})
		.post(urlencodedParser, (req, res) => {
			setTimeout(() => {
				const album = {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					phoneNumber: req.body.phoneNumber,
					email: req.body.email
				};
				const albums = albumService.addNewContact(album);
				console.log(albums);
				if (albums) {
					fs.writeFile(
						'./album/album.json',
						JSON.stringify(albums),
						err => {
							console.log(err);
							if (err) {
								res.status(202).send('');
							} else {
								res.status(500).send('');
							}
						}
					);
				} else {
					res.status(500).send('');
				}
			}, 200);
		});

	apiRoutes.route('/movies').get((req, res) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		setTimeout(() => {
			res.send(movieService.allMovies());
		}, 200);
	});

	apiRoutes.route('/books').get((req, res) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		setTimeout(() => {
			res.send(bookService.allBooks());
		}, 200);
	});

	apiRoutes.route('/ebooks').get((req, res) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		setTimeout(() => {
			res.send(bookService.allEBooks());
		}, 200);
	});
}

app.listen(port, () => {
	console.log(`Mock server listning on port : ${port}`);
});
