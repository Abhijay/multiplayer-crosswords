module.exports = function (io, sockets, games) {

    function prettyGrid(grid) {
        return grid
        let rows = grid.split('|')
        let prettyGrid = '\n'
        for (let row of rows) {
            if (row.length > 0) {
                // row = row.replace(/\s/g, '_')
                prettyGrid += `|${row}|\n`
            }
        }
        return prettyGrid
    }

    return function (socket) {
        var socketId = socket.id;
        console.log(`a user (${socketId}) connected`);

        socket.on('disconnect', function () {
            console.log(`user ${socketId} disconnected`);
            let guid = sockets[socketId]
            if (guid in games) {
                let game = games[guid]
                if (!(socketId in sockets)) {
                    sockets[socketId] = guid
                }
                if (games.players) {
                    let index = game.players.indexOf(socketId)
                    if (index >= 0) {
                        games.players.splice(index, 1)
                        console.log(`removed ${socketId} from ${guid}`)
                    }
                }
            }
            delete sockets[socketId]
        });

        socket.on('add player to game', function (params) {
            let guid = params['guid']
            let playerId = params['socketId']
            if (guid in games) {
                games[guid].players.push(playerId)
                console.log(`added ${playerId} to ${guid}`)
                socket.emit('initialize', games[guid].grid, guid)
            } else {
                if (Object.keys(games).length > 0) {
                    console.log(`${guid} not in ${Object.keys(games)}`)
                }
            }
        })

        socket.on('new move', function (guid, socketId, grid) {
            if (guid in games) {
                const game = games[guid]
                if (!(socketId in sockets)) {
                    sockets[socketId] = guid
                }
                if (grid != game.grid) {
                    let oldGrid = game.grid.slice()
                    game.makeMove(grid)
                    if (game.grid) console.log(`new move (${guid}) by (${socketId}): ${prettyGrid(grid)}`)
                    for (let playerID of game.players) {
                        if (playerID in io.sockets.connected && playerID != socketId) {
                            io.sockets.connected[playerID].emit('receive move', oldGrid, grid, socketId, guid)
                        }
                    }
                }
            }
        });

        socket.on('initiate check-all', function (guid, socketId, wrongletters) {
            if (guid in games) {
                const game = games[guid]

                if (game.grid) console.log(`new check (${guid}) by (${socketId})`)
                for (let playerID of game.players) {
                    if (playerID in io.sockets.connected && playerID != socketId) {
                        io.sockets.connected[playerID].emit('receive check-all', guid, socketId, wrongletters)
                    }
                }
            }
        });

        // socket.on('check-all response', function (guid, socketId, wrongletters) {
        //     if (guid in games) {
        //         const game = games[guid]

        //         // if (wrongletters != game.wrongletters) {
        //             // game.updateWrongLetters(wrongletters)
        //         if (game.grid) console.log(`final check (${guid}) by (${socketId})`)
        //         for (let playerID of game.players) {
        //             if (playerID in io.sockets.connected && playerID != socketId) {
        //                 io.sockets.connected[playerID].emit('finalize check-all', guid, socketId, wrongletters)
        //             }
        //         }
        //         // }
        //     }
        // });

        // socket.on('keyup', function (event, guid) {
        //     if (guid in games) {
        //         const game = games[guid]

        //         // if (wrongletters != game.wrongletters) {
        //             // game.updateWrongLetters(wrongletters)
        //         if (game.grid) console.log(`keyup (${guid}) by (${socketId})`)
        //         for (let playerID of game.players) {
        //             if (playerID in io.sockets.connected && playerID != socketId) {
        //                 io.sockets.connected[playerID].emit('receive keyup', event, guid)
        //             }
        //         }
        //         // }
        //     }
        // });
    }
}