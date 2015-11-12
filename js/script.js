/**
 * Sudoku Board Generator
 */
sudoku = {
    /**
     * Number of times to shuffle the board
     */
    SHUFFLE_TIMES: 50,
    /**
     * Delegated renderer
     */
    renderer: null,
    /**
     * Injected renderer
     * @param   Renderer
     * @throws  Error
     * @returns sudoku
     */
    setRenderer: function(renderer) {
        if (this.renderer === null) {
            if (renderer.hasOwnProperty('render') === false) {
                throw "Invalid renderer!";
            }
            this.renderer = renderer;
        }
        return this;
    },
    /**
     * Get the injected renderer
     * @throws  Error
     * @returns Object
     */
    getRenderer: function() {
        if (this.renderer === null) {
            throw "Renderer not set!";
        }
        return this.renderer;
    },
    /**
     * Init sudoku
     */
    generate: function() {
        /**
         * Generate the main board - normal list
         **/
        var board = new Array;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                board[i * 9 + j] = (i*3 + Math.floor(i/3) + j) % 9 + 1;
            }
        }
        // Write The Board unshuffled
        board = this.shuffle(board, 50);
        this.writeBoard(board);
    },
    /**
     * Suffle Board
     * @param   array board
     * @returns array
     */
    shuffle: function(board) {
        var times = this.SHUFFLE_TIMES;
        var numbers = new Array();
        for(time = 0; time < times; time++) {
            var from_number = Math.floor(Math.random() * 9) + 1;
            var to_number   = Math.floor(Math.random() * 9) + 1;
            // It is not necessary to change one number with the same number
            if(from_number == to_number) {
                times++;
                continue;
            }
            for(var i = 0; i < board.length; i++) {
                if(board[i] == from_number) {
                    board[i] = to_number;
                } else if(board[i] == to_number) {
                    board[i] = from_number;
                }
            }
        }
        return board;

    },
    /**
     * Delegate the board render
     * @param   array   board
     */
    writeBoard: function(board) {
        this.getRenderer().render(board);
    }
};

/**
 * Render the sudoku board - Rudimentary Renderer - writes some lines and some breaks
 * @type {{render: Function}}
 */
rudimentaryRenderer = {
    /**
     * Render method
     * @param   array   board
     */
    render: function(board) {
        var _finalBuild = '';
        for(var i = 0; i < board.length; i++) {
            key = i+1;
            var el = '';
            if(key % 3 == 0 && key != 0) {
                el = board[i] + ' | ';
                if( key % 9 == 0 ) {
                    el += '<br/>';
                }
            } else {
                el = board[i] + ' ';
            }
            _finalBuild += el;
            if( key % 27 == 0) {
                _finalBuild += '------------------------<br/>';
            }
            if( key == board.length ) {
                _finalBuild += '<br/><br/>';
            }
        }
        document.getElementById('content').innerHTML = _finalBuild;
    }
};

// Draw sudoku board
sudoku.setRenderer(rudimentaryRenderer);
sudoku.generate();