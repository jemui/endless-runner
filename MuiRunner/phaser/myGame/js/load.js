/**
 * Jeanette Mui
 * Load State
*/
var background;
var loadState = {
	preload: function () {
		// center the game
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;game.scale.refresh();


		// set the background color 
		game.stage.setBackgroundColor('#CFF2FF');

		var loadingText = game.add.text(150, 350, 'Loading...', {font: '40px Cambria', fill: '#033E54'});

		// load the texture atlas
		game.load.atlas('fish', 'assets/img/fish.png', 'assets/img/fish.json');
		game.load.atlas('waves', 'assets/img/waves.png', 'assets/img/waves.json');

		// load the music
		game.load.audio('titleMusic', ['assets/audio/Oniku Loop.wav']);
		game.load.audio('gameMusic', ['assets/audio/Oniku Loop2.wav']);
		game.load.audio('bubbles', ['assets/audio/bubbles_freesound.wav']);
		game.load.audio('bump', ['assets/audio/bookFlip3.ogg']);
	},

	// goes to title state when the game is done loading
	create: function() {
		game.state.start('title');
	}
};