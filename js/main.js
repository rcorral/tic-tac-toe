requirejs.config({
    baseUrl: 'js/'
});

require(['templates', 'ttt'], function(templates, game) {
    var $board = jQuery('.board-wrapper'),
        callback = function(indexes, message) {
            // If there is a length on indexes highlight those indexes
            if (indexes.length) {
                _.each(indexes, function(i) {
                    jQuery('[data-index='+i+']').addClass('winning');
                });
            }

            if (message === 'draw') {message = "It's a draw!"};
            if (message === 'ai') {message = "The computer wins!"};
            if (message === 'user') {message = "You won, congrats!"};

            $board.find('.board-message').html(message);
        };

    // Auto init game as the user playing first
    game.init({
        board: $board,
        user_piece: 'x',
        callback: callback
    });
    $board.addClass('user-piece-x');

    jQuery('[data-action~=restart]').on('click', function() {
        var users_piece = jQuery(this).data('begin-with') === 'ai' ? 'o' : 'x';

        $board.find('.board-message').html('');
        game.init({
            board: $board,
            user_piece: users_piece,
            callback: callback
        });
        // Remove previous classes and add new one
        $board.removeClass('user-piece-x').removeClass('user-piece-o');
        $board.addClass('user-piece-' + users_piece);
    });

    $board.on('click', '[data-type~=square][data-value=""]', function() {
        game.move(jQuery(this).data('index'));
    });
});