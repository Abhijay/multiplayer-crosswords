let socketId = null;
let guid = null
let isChecking = false
let receiveCount = 0

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

socket.on('connect', function () {
    // sessionId = socket.socket.sessionid;
    // console.log(sessionId);
    socketId = socket.id;
    console.log('socket on page')
    // guid = String(getParameterByName('guid'))
    guid = '0610'
    socket.emit('add player to game', { guid, socketId })
});

socket.on('receive move', function (oldGrid, newGrid, playerId, incomingGUID) {
    if (guid == incomingGUID) {
        if (playerId != socketId && oldGrid != newGrid) {
            console.log(`receive move (${guid}) by (${socketId}): ${newGrid}`)
            updateLetters(oldGrid, newGrid)
        }
    }
});

socket.on('initialize', function (grid, incomingGUID) {
    if (guid == incomingGUID) {
        updateLetters(currentGridState(), grid)
    }
})

function getTextTiles() {
    return Array.prototype.slice.call($(".crossword")[0].childNodes).filter(child => {
        return child.className != "dummy" && child.className != "endRow"
    })
}

function getWrongTiles() {
    const tiles = getTextTiles()
    const reds = []
    for (var i = 0; i < tiles.length; i++) {
        const childClassName = tiles[i].className
        if (childClassName.includes('wrongletter')) {
            reds.push(i)
        }
    }
    return reds
    // return tiles.map(child => child.className.includes('wrongletter'))
}

function updateLetters(oldGrid, newGrid) {
    let currentRow = 0
    let currentCol = 0
    if (oldGrid && newGrid) {
        const tiles = getTextTiles()
        for (var i = 0; i < newGrid.length; i++) {
            let currentIndex = i - currentRow
            let currentTile = tiles[currentIndex]
            if (newGrid[i] == '|') {
                currentRow += 1
            } else if (newGrid[i] != oldGrid[i]) {
                if (currentTile.className.includes('wrongletter')) {
                    currentTile.className = currentTile.className.replace('wrongletter', '')
                }
                for (let subchild of currentTile.childNodes) {
                    if (subchild.className == "letter-in-box") {
                        receiveCount += 2
                        subchild.innerText = newGrid[i]
                    }
                }
            }
        }
    }
}

function currentGridState() {
    let grid = ''
    let currentRow = ''

    let crossword = $('.crossword')[0]

    for (let child of crossword.childNodes) {
        if (child.className != "dummy") {
            if (child.className != "endRow") {
                let nextChar;
                for (let subchild of child.childNodes) {
                    if (subchild.className == "letter-in-box") {
                        nextChar = subchild.innerText || " "
                        break;
                    }
                }
                if (!nextChar) {
                    nextChar = "*"
                }
                currentRow += nextChar
            } else {
                grid += currentRow.slice()
                grid += '|'
                currentRow = ''
            }
        }
    }

    return grid

}

$(".crossword").on('DOMSubtreeModified', function () {
    //alert('changed')

    if (receiveCount <= 0) {
        const grid = currentGridState()
        socket.emit('new move', guid, socketId, grid)
    } else {
        if (receiveCount > 0) receiveCount--;
    }
})

document.getElementById('check-letter-button').onclick = function () {
    console.log('check-letter-clicked')
    // const reds = getWrongTiles()
    // socket.emit('check-letter-clicked', reds)
}



document.getElementById('check-word-button').onclick = function() {
    console.log('check-word-clicked')
    // const reds = getWrongTiles()
    // socket.emit('check-word-clicked', reds)
}

document.getElementById('check-all-button').onclick = function () {
    setTimeout(function() {
        console.log('check-all-clicked')
        const reds = getWrongTiles()
        if (!isChecking) {
            socket.emit('initiate check-all', guid, socketId, reds)
        } else {
            isChecking = false
        }
    }, 100);
}

socket.on('receive check-all', function (incomingGUID, incomingSocketId, reds) {
    if (incomingGUID == guid && socketId != incomingSocketId) {
        isChecking = true
        document.getElementById('check-all-button').click()
        updateChecks(reds)
        reds = getWrongTiles()
        socket.emit('check-all response', guid, socketId, reds)
    }
});

socket.on('finalize check-all', function (incomingGUID, incomingSocketId, reds) {
    if (incomingGUID == guid && socketId != incomingSocketId) {
        isChecking = true
        updateChecks(reds)
    }
});

function updateChecks(reds) {
    const tiles = getTextTiles()
    for (let index of reds) {
        const tile = tiles[index]
        if (!tile.className.includes('wrongletter')) {
            tile.className += ' wrongletter'
        }
    }
}