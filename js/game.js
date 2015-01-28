window.Game = (function(){
    function fillArrayWith(n, v) {
        var arr = Array.apply(null, Array(n));
        return arr.map(function (x, i) { return v });
    }

    var BoardMessage = React.createClass({
        render: function() {
            return (
                <span className="board-message">{this.props.message}</span>
            );
        }
    });

    var BoardSpace = React.createClass({
        render: function() {
            var fontKlass = '', content,
                klass = 'play-empty';
            if (this.props.play) {
                if ('o' === this.props.play) {
                    fontKlass = 'fa fa-circle-o';
                    klass = 'play-y'
                } else {
                    klass = 'play-x'
                    fontKlass = 'fa fa-times';
                }
                content = <i className={fontKlass}></i>
            } else {
                content = <span></span>
            }

            return (
                <li className={klass} onClick={this.props.onClick}>
                    {content}
                </li>
            );
        }
    });

    var Board = React.createClass({
        render: function() {
            var boardSpaces = this.props.board.map(function(space, i) {
                return (
                    <BoardSpace key={i} onClick={this.props.onSpaceClick} play={space} />
                );
            }.bind(this));

            return (
                <div>
                    <BoardMessage message={this.props.message} />
                    <ul>{boardSpaces}</ul>
                </div>
            );
        }
    });

    var GameApplication = React.createClass({
        getInitialState: function() {
            return {
                board: this.props.board || fillArrayWith(9, null),
                message: this.props.message || ''
            };
        },
        onSpaceClick: function(){
            // debugger
        },
        render: function() {
            var klass = 'board-wrapper ';
            klass += 'user-piece-' + (this.props.userStarts ? 'x' : 'o')
            return (
                <div className={klass}>
                    <Board board={this.state.board} message={this.state.message} onSpaceClick={this.onSpaceClick} />
                </div>
            );
        }
    });

    return {
        ApplicationFactory: React.createFactory(GameApplication)
    };
})();