/**
 * Jeanette Mui
 * Lose State
*/
var keyDown = false;
var loseState = {
	create: function() {
		background = game.add.sprite(0, -5, 'fish', 'fishTile089');
    	background.height = game.world.height+10;  // set the height of the background height to world bounds
	    background.width = game.world.width+5; // set the width of the background height to world bounds

	    // rocks
		var rock = game.add.sprite(Math.random()*300, 50, 'fish', 'fishTile082');
		rock.scale.setTo(Math.random()*10+4,10);

		// dead fish to decorate background
	    deadFishes = game.add.group();
	    deadFishes.enableBody = true;
	    var deadFish = deadFishes.create(game.world.width-100, background.height-100, 'fish', 'fishTile090');

	    deadFish.scale.y = -1;
	    deadFish.body.velocity.y = -15;

		var loseText = game.add.text(165, 150, 'You died!', {font: '40px Cambria', fill: '#4F628E'})
		var scoreText = game.add.text(110, 250, 'Your score is: ' + score, {font: '40px Cambria', fill: '#4F628E'})

		// Displays how to restart the game
		var restartText = game.add.text(65, 350, 'Press the spacebar to\nrestart the game.', {font: '40px Cambria', fill: '#4F628E'})

		// background kelp 
	    for(var i = 0; i < ((Math.random() * 3)+1); i++) {
		    kelp = game.add.sprite((Math.random() * 300)+100, background.height-115, 'fish', 'fishTile030');
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

	},
		update: function () {
			if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && keyDown == false) {
				keyDown = true;
				music.stop();

				game.state.start('title');
			}
			if(game.input.keyboard.justReleased(Phaser.Keyboard.SPACEBAR))
			    keyDown = false;   	
	},
}