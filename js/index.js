
var buttons = document.querySelectorAll('.player-picker .js-restart');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
        var options = {
            userStarts: JSON.parse(e.currentTarget.dataset.userstart)
        };
        React.render(
            Game.ApplicationFactory(options),
            document.querySelector('.tic-tac-toe-wrapper')
        );
    });
}
