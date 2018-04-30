/**
 * Jeanette Mui
 * Play State
 * Free-to-use sprites from Kenney's Assets
 * Free-to use music from dl-sounds and freesounds
*/

var keyDown = false;
var obstacle,score, lives, scoreText;
var timer = 0;
var speed = 200;


var playState = {
	create: function() {
		this.keyboard = game.input.keyboard;

		music = game.add.audio('gameMusic');
		music.loopFull(0.3);
		music.play(); 

		counter = 0;
		level = 0;
		lives = 3;
		score = 0;

	    // Store water as a variable and add the background
	    var water = game.add.sprite(0, -5, 'fish', 'fishTile089');
	    water.height = game.world.height;  // set the height of the water background height to world bounds
	    water.width = game.world.width+5; // set the width of the water background height to world bounds

	    // Background rocks
		rocks = game.add.group(); 
		rocks.enableBody = true;

		var rock = rocks.create((Math.random()*600), 50, 'fish', 'fishTile082');
		rock.scale.setTo((Math.random()*10)+5,10);
		rock.body.velocity.x = -150;

	   //  The obstacle group contains the objects that the player must avoid
	    obstacle = game.add.group();
	    obstacle.enableBody = true; // enable physics for any object that is created in this group

	    // Create ground. Works as the boundary
	    var ground = obstacle.create(0, game.world.height - 56, 'fish', 'fishTile001');
	    ground.scale.setTo(10, 4);  // Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    ground.body.immovable = true;  // This stops the ground from falling away 

	    // Crete top border of the game
	    topBound = obstacle.create(0, -64, 'fish', 'fishTile001');
	   	topBound.scale.setTo(10, 1); 
	    topBound.body.immovable = true;

	    // Add kelp to the game
		kelps = game.add.group();
		kelps.enableBody = true;

		sands = game.add.group();
		sands.enableBody = true;
	
	    this.player = game.add.sprite(50, game.world.centerY, 'fish', 'fishTile072');  // The player sprite
	    game.physics.arcade.enable(this.player); // Enable physics on the player

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.player.body.bounce.y = 0.4;

	    // Set collision bounds of player sprite
	    this.player.body.setSize(55,20,5,25);

	    //  Two animations for swimming left and right.
	    this.player.animations.add('swim', ['fishTile072', 'fishTile073'], 30, true);
	    this.player.animations.play('swim', 5, true);

		// setup difficulty timer
		this.difficultyTimer = game.time.create(false);	// .create(autoDestroy)
		this.difficultyTimer.loop(2000, this.kelp, this);
		this.difficultyTimer.loop(3000, this.anotherObstacle, this);
		this.difficultyTimer.loop(1000, this.floor, this);
		this.difficultyTimer.loop(1000, this.speedBump, this); // .loop(delay, callback, callbackContext)
		this.difficultyTimer.start();	// don't forget to start the timer!!!!

	    this.kelp(); // Spawn kelp
	    this.floor();    // Generate floor
	    this.obstacles();	// Spawn the obstacles

	    // Lives
	    life1 = game.add.sprite(310, 5, 'fish', 'fishTile091');
	    life2 = game.add.sprite(369, 5, 'fish', 'fishTile091');
	    life3 = game.add.sprite(429, 5, 'fish', 'fishTile091');

	    // For changing the life sprite to dead when the player loses a life 
	    life1.animations.add('dead', ['fishTile090'], 10, true);
	    life2.animations.add('dead', ['fishTile090'], 10, true);
	    	 
	    // Game Score. Displayed in top left corner
	    scoreText = game.add.text(16, 16, 'Score: 0', { font: 'Cambria', fontSize: '32px', fill: '#000' });  // Shows the player's current score
	},

	anotherObstacle: function() {
		var grayFish = obstacle.create(((Math.random() * 900)+550), ((Math.random() * 600)), 'fish', 'fishTile102');
	    	 
	    // animations for pufferfish
		grayFish.animations.add('grayFish', ['fishTile102', 'fishTile103'], 30, true);
		grayFish.animations.play('grayFish', 10, true);

		//Properties for pufferfish
	    grayFish.body.setSize(40, 40, 13, 13); //(width, height, offsetX, offsetY)
	    grayFish.body.immovable = true;	// prevent pufferfish from bouncing off the player
		grayFish.scale.x *=-1;	// Flip sprite
	    grayFish.body.velocity.x = -500; 
	},

	speedBump: function() {
		// increment level
		level++;
		if(speed < 700)		// cap speed of pufferfish
			speed +=100;

		if(level%5 == 0) {		// for ever 5 levels, spawn more pufferfish
			this.obstacles();
			this.obstacles();
		}
		if(level > 10) 
			this.obstacles();
		if(level > 20) 
			this.obstacles();
	},

	// Generate the floor
	floor: function() {
		var counter = 0;
	    for(var i = 0; i < game.world.width*2; i+=64) {
	    	// Adds one kind of sand if counter is even, else add other kind of sand floor
	    	if(counter%2 != 0) {
				var sand = sands.create(i, game.world.height - 64, 'fish','fishTile042');
		    	sand.body.velocity.x -= 150;   
		    }
	    	else  {
				var sand = sands.create(i, game.world.height - 64, 'fish','fishTile043');
		    	sand.body.velocity.x -= 150;   
		    }
	    	counter++;
	    }
	},

	obstacles: function(){
		// spawn 2-4 pufferfish total on each call
	    for(var i = 0; i < (Math.random() * 3); i++) {
			var pufferfish = obstacle.create(((Math.random() * 900)+550), ((Math.random() * 600)), 'fish', 'fishTile100');
	    	 
	    	// animations for pufferfish
			pufferfish.animations.add('puff', ['fishTile100', 'fishTile101'], 30, true);
		   	pufferfish.animations.play('puff', 10, true);

		   	//Properties for pufferfish
	    	pufferfish.body.setSize(40, 40, 13, 13);
	    	pufferfish.body.immovable = true;	// prevent pufferfish from bouncing off the player
		    pufferfish.scale.x *=-1;	// Flip sprite
	    	pufferfish.body.velocity.x = ((Math.random() * -speed)-100); 
	    }
	},

	// randomly generates background rocks and kelp
	kelp: function() {
	    for(var i = 0; i < ((Math.random() * 3)+1); i++) {
			var kelp = kelps.create(((Math.random() * 900)+550),game.world.height - 115, 'fish','fishTile028');
	    	kelp.body.velocity.x = -150;   
	    	
	    	// More kelp!
	    	if(i%2==1) {
			var kelp2 = kelps.create(((Math.random() * 900)+550),game.world.height - 125, 'fish','fishTile048');
	    	kelp2.body.velocity.x = -150;   
	    	}

	    	// Generate background rocks
	    	if(i%2==0){
		    	var rock = rocks.create((Math.random()*700)+550, 50, 'fish', 'fishTile082');
		 		rock.scale.setTo(Math.random()*10+4,10);
		 		rock.body.velocity.x = -150;
	 		}
	    }
	},

	// run game loop
	update: function() {
		//  Collide the player and the stars with the obstacle
    	var hitPlatform = game.physics.arcade.collide(this.player, obstacle);
 		sound = game.add.audio('bump');		

	   // Read input from keyboard to move the player
	    cursors = game.input.keyboard.createCursorKeys();
		
	    // Reset the players velocity (movement)
	    this.player.body.velocity.x = 0;

	    // Leads to game over condition
	    if(this.player.x < -80) {
	    	lives--;
	    	sound.play();
	    	this.player.x = 150;
	    }

	    // Keep track of lives
	    if(lives == 2) 
	    	life1.animations.play('dead');
	    if(lives == 1)
	    	life2.animations.play('dead');

	    if (cursors.left.isDown)
	        this.player.body.velocity.x = -150;	// Move to the left
	    if (cursors.right.isDown)
	        this.player.body.velocity.x = 150;  // Move to the right
	    if (cursors.up.isDown)
	    	this.player.body.velocity.y = -100;	// Move up
	    if (cursors.down.isDown) 
	    	this.player.body.velocity.y = +100; // Move down

	    //incase the player moves through the ground
	    if(this.player.y > 610)
	    	this.player.y = 500;

	   game.physics.arcade.collide(this.pufferfish, this.player);	// collide players with pufferfish
	   		
	    // Everytime the timer reaches a number divisible by 30, score goes up by 1
	    timer++;
	    if(timer%30 == 0) 
	 	   score = score+1;

	 	// spawn more pufferfish every once in a while
	    if(timer%100 == 0) {
	   	 	this.obstacles();
	    }

	 	// Displays updated score
		scoreText.text = 'Score: ' + score;

		// Go to game over screen when all lives are lost
		if(lives == 0) {
			loseSound = game.add.audio('bubbles');
			loseSound.play();
			game.state.start('lose');
		}

	},
}