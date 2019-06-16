'use script';

let games = null
const Game = require('../game/game');

exports.load_catalog = function (games) {

}

exports.load_crossword = function (games) {
    return function (req, res) {
        //todo
        // console.log(`load ${req} ${res}`)

        var guid = '0610'
        if (!(guid in games)) {
            var game = new Game(guid)
            games[guid] = game
        }

        var init_js = `<script src="static/scripts/puzzle.js"></script>`
        res.render('0610', {
            title: 'Configurable Game | New Game',
            init: init_js
        })

    }
}


exports.ignore = function (req, res) {
    res.render('blank')
}
