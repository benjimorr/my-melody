# myMelody
## A small music playing website built primarily with JavaScript and jQuery

![](/assets/images/my_melody_landing.gif)

[myMelody](https://mymelody.netlify.com) is a nice little music player where you can listen to your favorite albums & music collections. This colorful web application is meant to provide ease-of-use to those who love to play some music. If you want to edit the library to tailor to your own music preferences, feel free to clone this repo, and import your own mp3 files into the `/assets/music/` directory!

### myMelody Tech Details

| **File** | **Purpose** |
| :---: | --- |
| [`landing.js`](https://github.com/benjimorr/my-melody/blob/master/scripts/landing.js) | Controls the JavaScript for the home page, including the scrolling rules & animation of the three landing points at the bottom of the page |
| [`collection.js`](https://github.com/benjimorr/my-melody/blob/master/scripts/collection.js) | This file uses a `for` loop to provide an easy way to fill the collection view with album covers |
| [`album.js`](https://github.com/benjimorr/my-melody/blob/master/scripts/album.js) | The bulk of the functionality for `myMelody`; controls hover on & off DOM manipulation, play/pause button appearance, as well as the play bar in order to play/pause and skip songs |
| [`fixtures.js`](https://github.com/benjimorr/my-melody/blob/master/scripts/fixtures.js) | Contains several `Fixture` objects that allow you to easily populate the album view |
| [`index.html`](https://github.com/benjimorr/my-melody/blob/master/index.html) | The main page of the application; includes all script and stylesheet imports, as well as the layout of the home page |
| [`collection.html`](https://github.com/benjimorr/my-melody/blob/master/collection.html) | A small HTML file that presents all album covers in the collection for the user |
| [`album.html`](https://github.com/benjimorr/my-melody/blob/master/album.html) | The HTML markup to present a single album and its songs, including the play bar in order to play/pause songs |
