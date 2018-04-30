/**
 * Jeanette Mui
 * Boot State. Boot game and start the game physics
*/
var bootState = {
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.state.start('load');
	}
}