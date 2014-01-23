define('ttt', ['templates'], function(templates) {
    // Create our tic tac toe object
    var ttt = {
        init: function(opts) {
            var smart_first_moves = [0, 2, 4, 6, 8];
            this.$board = opts.board;
            this.board = new Array(9);
            this.draw();
            this.user_piece = opts.user_piece
            this.ai_piece = opts.user_piece === 'x' ? 'o' : 'x';

            // x always goes first, so check if we need to go first
            if (this.ai_piece === 'x') {
                // Pick a random index of the suggested "smart" moves
                this.move(smart_first_moves[Math.floor(Math.random() * smart_first_moves.length)], this.ai_piece);
            }
        },

        draw: function() {
            this.$board.html(_.template(templates.board, {board: this.board, templates: templates}));
        },

        move: function(index, piece) {
            // Prevent invalid moves
            if (typeof this.board[index] !== 'undefined') {return;}

            this.board[index] = piece;
            this.draw();
        },

        user_move: function(index) {
            this.move(index, this.user_piece);
        }
    };

    return {
        init: ttt.init.bind(ttt),
        move: ttt.user_move.bind(ttt)
    };
});