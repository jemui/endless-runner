/**
 * Jeanette Mui
 * Title State
*/
var background, waves, waves2;
var counter = 1;
var keyDown = false;
var titleState = {
	create: function () {
		music = game.add.audio('titleMusic');
		music.loopFull(0.3);
		music.play(); 

		// Background
		game.stage.setBackgroundColor('#CFF2FF');

		background = game.add.sprite(0, 100, 'fish', 'fishTile089');
    	background.height = game.world.height;  // set the height of the background height to world bounds
	    background.width = game.world.width+5; // set the width of the background height to world bounds
	    
	    // background kelp
	    for(var i = 0; i < ((Math.random() * 3)+1); i++) {
		    kelp = game.add.sprite((Math.random() * 400)+100, background.height-115, 'fish', 'fishTile030');
		  	kelp.animations.add('kelp', ['fishTile030', 'fishTile031'], 1, true);
	 	  	kelp.animations.play('kelp', 1, true);
		}
	    // ground
	    for(var i = 0; i < game.world.width; i+=64) {
	    	// Adds one kind of sand if counter is even, else add other kind of sand floor
	    	if(counter%2 != 0) 
	    		sand = game.add.sprite(i, background.height-64, 'fish', 'fishTile038');
	    	else 
	    		sand = game.add.sprite(i, background.height-64, 'fish', 'fishTile039');
	    	counter++;
	    }

	    // ocean waves
	    for(var i = 0; i < game.world.width; i+=32) {
	    	// Adds waves if counter is even, else add flat waves 
	    	if(counter%2 != 0) {
	    		waves = game.add.sprite(i, 50, 'waves', 'wave1');
	    		waves.animations.add('wave', ['wave1', 'wave2'], 1, true);
	   			waves.animations.play('wave', 1, true);
	    	}
	    	else {
	    		waves2 = game.add.sprite(i, 50, 'waves', 'wave2');
		    	waves2.animations.add('wave2', ['wave2', 'wave1'], 1, true);
		   		waves2.animations.play('wave2', 1, true);
	    	}
	    	counter++;
	    }

	    // fish to decorate the background
		pufferfish = game.add.sprite(-42, 205, 'fish', 'fishTile100');  
		blueFish = game.add.sprite(game.world.width+72, 475, 'fish', 'fishTile076');
		blueFish.scale.x *=-1;

		// animations for fish
		pufferfish.animations.add('puff', ['fishTile100', 'fishTile101'], 10, true);
	   	pufferfish.animations.play('puff', 1, true);

		blueFish.animations.add('blue', ['fishTile077', 'fishTile076'], 20, true);
	   	blueFish.animations.play('blue', 1, true);

	   	// text 
		var name = game.add.text(100, 150, 'Endless Swimmer', {font: '40px Cambria', fill: '#4F628E'})
		var lives = game.add.text(75, 275, 'Your 3 lives are displayed\nin the top right corner.\n \nYou lose a life everytime you\n get pushed off the screen.', {font: '30px Cambria', fill: '#4F628E'})
		
		// Instructions on how to start the game
		var start = game.add.text(50, 550, 'Press the space bar to start the \ngame!', {font: '30px Cambria', fill: '#4F628E'})
	},

	update: function () {
		// moves and updates pufferfish's position
		pufferfish.x++;
		if(pufferfish.x > game.world.width+32) 
			pufferfish.x = -42;
		
		blueFish.x = blueFish.x - 0.5;
		if(blueFish.x < -32)
			blueFish.x = game.world.width+42;

		// Spacebar cycles through to the next state once if it is pressed
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && keyDown == false) {
			keyDown = true;
			music.stop();
			game.state.start('play');
		}
		// Reset the keyDown variable on release
		if(game.input.keyboard.justReleased(Phaser.Keyboard.SPACEBAR))
		    keyDown = false;   
	},	
};
