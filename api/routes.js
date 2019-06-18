'use strict';

var games = null  

module.exports = function (games) {
    return function (app) {
        var controller = require('./controller.js');

        app.route('/').get((req, res) => res.redirect('/catalog'));

        app.route('/catalog')
            .get(controller.load_native_catalog(games));

        app.route('/puzzle')
            .get(controller.load_native_crossword(games))

        // app.route('/')
        //     .get(controller.load_crossword(games));

        app.route('/postScore').post(controller.ignore);
        app.route('/log').post(controller.ignore);
        // app.route('/postScore').get(controller.ignore)
    };
};
