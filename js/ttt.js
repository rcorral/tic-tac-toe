define('ttt', ['templates'], function(templates) {
    // Create our tic tac toe object
    var ttt = {
        init: function(opts) {
            var smart_first_moves = [0, 2, 4, 6, 8];

            this.win_callback = opts.callback;
            this.$board = opts.board;
            this.board = new Array(9);
            this.draw_board();
            this.user_piece = opts.user_piece
            this.ai_piece = opts.user_piece === 'x' ? 'o' : 'x';
            this.done = false;

            // x always goes first, so check if we need to go first
            if (this.ai_piece === 'x') {
                // Pick a random index of the suggested "smart" moves
                this.move(smart_first_moves[Math.floor(Math.random() * smart_first_moves.length)], this.ai_piece);
            }
        },

        draw_board: function() {
            this.$board.html(_.template(templates.board, {board: this.board, templates: templates}));
        },

        handle_possible_win: function() {
            var indexes = this.is_win(this.board);

            if (!indexes) {return;}

            this.done = true;
            this.win_callback(indexes);
        },

        move: function(index, piece) {
            // Prevent invalid moves
            if (typeof this.board[index] !== 'undefined') {return;}

            this.board[index] = piece;
            this.draw_board();
        },

        user_move: function(index) {
            if (this.done) {return;}

            this.move(index, this.user_piece);
            this.handle_possible_win();
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
            this.handle_possible_win();
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
            if (board[0] + board[1] + board[2] === 'xxx') {return [0,1,2];}
            if (board[0] + board[1] + board[2] === 'ooo') {return [0,1,2];}
            if (board[3] + board[4] + board[5] === 'xxx') {return [3,4,5];}
            if (board[3] + board[4] + board[5] === 'ooo') {return [3,4,5];}
            if (board[6] + board[7] + board[8] === 'xxx') {return [6,7,8];}
            if (board[6] + board[7] + board[8] === 'ooo') {return [6,7,8];}
            // Vertical wins
            if (board[0] + board[3] + board[6] === 'xxx') {return [0,3,6];}
            if (board[0] + board[3] + board[6] === 'ooo') {return [0,3,6];}
            if (board[1] + board[4] + board[7] === 'xxx') {return [1,4,7];}
            if (board[1] + board[4] + board[7] === 'ooo') {return [1,4,7];}
            if (board[2] + board[5] + board[8] === 'xxx') {return [2,5,8];}
            if (board[2] + board[5] + board[8] === 'ooo') {return [2,5,8];}
            // Diag
            if (board[0] + board[4] + board[8] === 'xxx') {return [0,4,8];}
            if (board[0] + board[4] + board[8] === 'ooo') {return [0,4,8];}
            if (board[2] + board[4] + board[6] === 'xxx') {return [2,4,8];}
            if (board[2] + board[4] + board[6] === 'ooo') {return [2,4,8];}

            return false;
        }
    };

    return {
        init: ttt.init.bind(ttt),
        move: ttt.user_move.bind(ttt)
    };
});