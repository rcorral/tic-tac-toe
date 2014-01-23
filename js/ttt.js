define('ttt', ['templates'], function(templates) {
    // Create our tic tac toe object
    var ttt = {
        init: function(opts) {
            this.draw(opts.board);
        },

        draw: function($el, plays) {
            // If no plays then clean out the board
            if (typeof plays === 'undefined') {
                plays = [];
            }

            $el.html(_.template(templates.board, {plays: plays, templates: templates}));
        },

        move: function(index) {

        }
    };

    return {
        init: ttt.init.bind(ttt),
        move: ttt.move.bind(ttt)
    };
});