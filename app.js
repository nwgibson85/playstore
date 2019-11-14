const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');

const app = express();
const apps = require('./app-data.js');

app.use(morgan('common'));
// app.use(cors());

app.get('/apps', (req, res) => {
    const { search = "", sort, genres } = req.query;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of Rating or app');
        }
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genres must be on of Action, Puzzle, Strategy, Casual, Arcade, Card');
        }
    }
    
    let results = apps
        .filter(name =>
            name
                .App
                .toLowerCase()
                .includes(search.toLowerCase()));
    
    console.log(results, '1');
    if (sort) {
        console.log(results, 'mid')
        results
            .sort((a,b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    }
    console.log(results, '2');

    if (genres) {
        results
            .sort((a,b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    }
    
    res
        .json(results);
});

app.listen(8000, () => {
console.log('Server started on PORT 8000');
});