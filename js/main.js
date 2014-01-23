requirejs.config({
    baseUrl: 'js/'
});

require(['templates', 'ttt'], function(templates, game) {
    var $board = jQuery('.board-wrapper'),
        callback = function(indexes) {
            _.each(indexes, function(i) {
                jQuery('[data-index='+i+']').addClass('winning');
            });
        };

    // Auto init game as the user playing first
    game.init({
        board: $board,
        user_piece: 'o',
        callback: callback
    });
    $board.addClass('user-piece-o');

    jQuery('[data-action~=restart]').on('click', function() {
        var users_piece = jQuery(this).data('begin-with') === 'ai' ? 'o' : 'x';

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