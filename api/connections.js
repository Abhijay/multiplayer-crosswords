module.exports = function (io, sockets, games) {
    return function (socket) {
        console.log('a user connected');
        var socketId = socket.id;

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('add player to game', function (params) {
            let guid = params['guid']
            let playerId = params['socketId']
            if (guid in games) {
                games[guid].players.push(playerId)
                console.log(`added ${playerId} to ${guid}`)
                socket.emit('initialize', games[guid].grid, guid)
            } else {
                console.log(`${guid} not in ${Object.keys(games)}`)
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
                    if (game.grid) console.log(`new move (${guid}) by (${socketId}): ${grid}`)
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
                if (!(socketId in sockets)) {
                    sockets[socketId] = guid
                }
                if (game.grid) console.log(`new check (${guid}) by (${socketId})`)
                for (let playerID of game.players) {
                    if (playerID in io.sockets.connected && playerID != socketId) {
                        io.sockets.connected[playerID].emit('receive check-all', guid, socketId, wrongletters)
                    }
                }
            }
        });

        socket.on('check-all response', function (guid, socketId, wrongletters) {
            if (guid in games) {
                const game = games[guid]
                if (!(socketId in sockets)) {
                    sockets[socketId] = guid
                }
                // if (wrongletters != game.wrongletters) {
                    // game.updateWrongLetters(wrongletters)
                if (game.grid) console.log(`final check (${guid}) by (${socketId})`)
                for (let playerID of game.players) {
                    if (playerID in io.sockets.connected && playerID != socketId) {
                        io.sockets.connected[playerID].emit('finalize check-all', guid, socketId, wrongletters)
                    }
                }
                // }
            }
        });
    }
}