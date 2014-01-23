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
            this.ai_move();
        },

        ai_move: function() {
            var minmax = this.find_best_move(this.board, true, 1),
                next_move = -11,
                index;

            for (var i = 0; i < minmax.length; i++) {
                if (typeof minmax[i] === null) {continue;}

                if (minmax[i] > next_move) {
                    next_move = minmax[i];
                    index = i;
                }
            }

            this.move(index, this.ai_piece);
        },

        // Figure out best move
        find_best_move: function(temp_board, ais_move, depth) {
            var scores = new Array(9),
                play_board,
                minmax_return = !ais_move ? 11 : -11;

            if (this.is_win(temp_board)) {
                if (!ais_move) {
                    return depth + 10;
                } else {
                    return depth - 10;
                }
            }

            for (var i = 0; i < temp_board.length; i++) {
                // Continue if this squared has a play
                if (typeof temp_board[i] !== 'undefined') {continue;}

                play_board = temp_board.slice(0);
                play_board[i] = ais_move ? this.ai_piece : this.user_piece;

                scores[i] = this.find_best_move(play_board, !ais_move, depth + 1);
            }

            if (depth === 1) {return scores};

            for (var i = 0; i < scores.length; i++) {
                if (typeof scores[i] === null) {continue;}

                // If the scores are from the enemy
                if (!ais_move && scores[i] < minmax_return) {
                    minmax_return = scores[i];
                } else if (ais_move && scores[i] > minmax_return) {
                    minmax_return = scores[i];
                }
            }
            return minmax_return;
        },

        is_win: function(board) {
            // Horizontal wins
            if (board[0] + board[1] + board[2] === 'xxx') {return 'x';}
            if (board[0] + board[1] + board[2] === 'ooo') {return 'o';}
            if (board[3] + board[4] + board[5] === 'xxx') {return 'x';}
            if (board[3] + board[4] + board[5] === 'ooo') {return 'o';}
            if (board[6] + board[7] + board[8] === 'xxx') {return 'x';}
            if (board[6] + board[7] + board[8] === 'ooo') {return 'o';}
            // Vertical wins
            if (board[0] + board[3] + board[6] === 'xxx') {return 'x';}
            if (board[0] + board[3] + board[6] === 'ooo') {return 'o';}
            if (board[1] + board[4] + board[7] === 'xxx') {return 'x';}
            if (board[1] + board[4] + board[7] === 'ooo') {return 'o';}
            if (board[2] + board[5] + board[8] === 'xxx') {return 'x';}
            if (board[2] + board[5] + board[8] === 'ooo') {return 'o';}
            // Diag
            if (board[0] + board[4] + board[8] === 'xxx') {return 'x';}
            if (board[0] + board[4] + board[8] === 'ooo') {return 'o';}
            if (board[2] + board[4] + board[6] === 'xxx') {return 'x';}
            if (board[2] + board[4] + board[6] === 'ooo') {return 'o';}

            return false;
        }
    };

    return {
        init: ttt.init.bind(ttt),
        move: ttt.user_move.bind(ttt)
    };
});