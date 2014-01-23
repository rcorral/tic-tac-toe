requirejs.config({
    baseUrl: 'js/'
});

require(['templates', 'ttt'], function(templates, game) {
    var $board = jQuery('.board-wrapper');

    // Auto init game as the user playing first
    game.init({
        board: $board,
        user_piece: 'x' // X always starts
    });
    $board.addClass('user-piece-x');

    jQuery('[data-action~=restart]').on('click', function() {
        var users_piece = jQuery(this).data('begin-with') === 'ai' ? 'o' : 'x';

        game.init({
            board: $board,
            user_piece: users_piece
        });
        // Remove previous classes and add new one
        $board.removeClass('user-piece-x').removeClass('user-piece-o');
        $board.addClass('user-piece-' + users_piece);
    });

    $board.on('click', '[data-type~=square][data-value=""]', function() {
        game.move(jQuery(this).data('index'));
    });
});