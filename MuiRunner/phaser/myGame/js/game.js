/**
 * Jeanette Mui
 * Game State. Adds all the current states
*/
var game = new Phaser.Game(500, 700, Phaser.AUTO,'gameDiv' );

// Add the game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('play', playState);
game.state.add('lose', loseState);

game.state.start('boot');