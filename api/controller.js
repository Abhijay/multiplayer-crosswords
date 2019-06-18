'use script';

let games = null
var fs = require('fs')
const Game = require('../game/game');
// const catalog_script = fs.readdirSync('./game').forEach(file => {
//     console.log(file);
//   });
// const catalog_script = fs.readFileSync('./game/catalog.js', 'utf-8')
// console.log(catalog_script)

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

//  /html/body/script[1]

exports.load_native_catalog = function (games) {
    const catalogScript = fs.readFileSync('./public/scripts/catalog.js', 'utf8')
    return function (req, res) {
        res.merge('blank', {
            // external url to fetch
            sourceUrl: `https://cdn1.amuselabs.com/wapo/wp-picker?set=wapo-daily&embed=1&limit=28&ads=0&heightReduction=60`,
            // css selector to inject our content into
            sourcePlaceholder: 'script[id="blank-placeholder"]', //'div[id="fb-roots"]',
            //    // pass a function here to intercept the source html prior to merging
            transform: function ($, model) {
                // let socketScript = `<script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>`
                // $(socketScript).insertAfter('.orientation-change')
                $(`<script id="custom"></script>`).insertBefore('.puzzles')
                $('#custom').prepend(catalogScript)
                $('<script>var originalOrigin = window.location.origin</script>').insertAfter('head')
                $('.navbar-brand').remove()
            }
        });
    }

}

exports.load_native_crossword = function (games) {
    const puzzleScript = fs.readFileSync('./public/scripts/puzzle.js', 'utf-8')
    return function (req, res) {
        if ("guid" in req.query) {
            var guid = req.query.guid
            // var guid = 'tca190616'
            if (!(guid in games)) {
                var game = new Game(guid)
                games[guid] = game
            }

            res.merge('crossword-min-js', {
                // external url to fetch
                sourceUrl: `https://cdn1.amuselabs.com/wapo/crossword?id=${guid}&set=wapo-daily&embed=1&compact=1&picker=wp-picker&limit=14&heightReduction=60`,
                // css selector to inject our content into
                sourcePlaceholder: 'script[id="crossword"]', //'div[id="fb-roots"]',
                //    // pass a function here to intercept the source html prior to merging
                transform: function ($, model) {
                    const socketScript = `<script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>`
                    $(`<script id="sockets"></script>`).insertAfter('.orientation-change')
                    $('#sockets').prepend(puzzleScript)
                    $(socketScript).insertAfter('.orientation-change')
                    $('.navbar-brand').remove()

                    $('script[src*=crossword-min]').attr('id', 'crossword')
                    $('script[src*=crossword-min]').attr('src', null)
                }
            });
        } else {
            res.render('invalid')
        }
    }
}


exports.ignore = function (req, res) {
    res.render('blank')
}
