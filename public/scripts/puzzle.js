var socket = io();
let socketId = null;
let guid = null
let isChecking = false
let ignoreTextModifications = false

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

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
}

function updateLetters(oldGrid, newGrid) {
    ignoreTextModifications = true

    let currentRow = 0
    const rowLength = newGrid.indexOf('|')
    if (oldGrid && newGrid) {
        const tiles = getTextTiles()
        for (var i = 0; i < newGrid.length; i++) {
            let currentIndex = i - currentRow
            let currentCol = currentIndex % rowLength
            let currentTile = tiles[currentIndex]
            if (newGrid[i] == '|') {
                currentRow += 1
            } else if (newGrid[i] != oldGrid[i]) {
                for (let subchild of currentTile.childNodes) {
                    if (subchild.className == "letter-in-box") {
                        puzzle_handler.letter_entered(currentCol, currentRow, newGrid[i], true, true, null)
                    }
                }
            }
        }
    }
    ignoreTextModifications = false
}

function updateChecks(reds) {
    const tiles = getTextTiles()
    for (let index of reds) {
        const tile = tiles[index]
        if (!tile.className.includes('wrongletter')) {
            tile.className += ' wrongletter'
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

function simulate(element, eventName)
{
    function extend(destination, source) {
        for (var property in source)
          destination[property] = source[property];
        return destination;
    }

    var eventMatchers = {
        'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
    }
    var defaultOptions = {
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true
    }

    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}


/**
 * Event Listeners
 */

document.getElementById('check-letter-button').onclick = function () {
    console.log('check-letter-clicked')
    // const reds = getWrongTiles()
    // socket.emit('check-letter-clicked', reds)
}



document.getElementById('check-word-button').onclick = function () {
    console.log('check-word-clicked')
    // const reds = getWrongTiles()
    // socket.emit('check-word-clicked', reds)
}

document.getElementById('check-all-button').onclick = function () {
    if (!isChecking) {
        socket.emit('initiate check-all', guid, socketId)
    } else {
        isChecking = false
    }
}


// document.addEventListener('click', function (event) {
//     // Kill the event
//     console.log('click')
//     console.log(r_static)
//     // console.log(s_static)
//     // socket.emit('keyup', event, guid)
// }, true
// );

$(".crossword").on('DOMSubtreeModified', function () {
    if (!ignoreTextModifications) {
        if (guid && socketId) {
            var grid = currentGridState();
            socket.emit('new move', guid, socketId, grid);
        }
    }
})

/**
 * Sockets.io connections
 */

socket.on('connect', function () {
    // sessionId = socket.socket.sessionid;
    // console.log(sessionId);
    socketId = socket.id;
    console.log('socket on page')
    guid = String(getParameterByName('guid'))
    socket.emit('add player to game', { guid, socketId })
});

socket.on('receive move', function (oldGrid, newGrid, playerId, incomingGUID) {
    if (guid == incomingGUID) {
        if (playerId != socketId && oldGrid != newGrid) {
            console.log(`receive move (${guid}) by (${socketId}): ${prettyGrid(newGrid)}`)
            updateLetters(oldGrid, newGrid)
        }
    }
});

socket.on('initialize', function (grid, incomingGUID) {
    if (guid == incomingGUID) {
        updateLetters(currentGridState(), grid)
    }
})

socket.on('receive check-all', function (incomingGUID, incomingSocketId, reds) {
    if (incomingGUID == guid && socketId != incomingSocketId) {
        isChecking = true
        document.getElementById('check-all-button').click()
    }
});