class Game {
    constructor (guid, grid = '') {
        this.grid = ''
        this.players = []
        this.guid = guid
    }

    makeMove(newGrid) {
        if (!this.grid) {
            this.grid = newGrid
            return;
        }

        if (this.grid != newGrid) {
            this.grid = newGrid
            console.log('puzzle changed')
        }
    }

    /**
     * Implementation optional
     */
    init(saveData = null) {
        // if (saveData) {
        //     this.loadGame(saveData)
        // } else {
        //     this.setInitialLayout(true)
        //     this.setInitialPieces()
        //     this.setGUID()
        // }
    }
}

module.exports = Game;