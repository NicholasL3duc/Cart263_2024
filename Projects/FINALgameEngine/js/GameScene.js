class GameScene extends Phaser.Scene {

// Scenes
player;
bones;
cursor;
platforms;
movingPlatform;

preload()
{
    this.load.image('sky')
    this.load.image('GraveYard')
    this.load.image('bones')
    this.load.spritesheet('skelly')
// NOTE : fix this later Nick (dumbass)

}
create ()
{
this.add.image (400,300,'sky');

// platform settings 
    this.platforms.create(400,568,'GraveYard').setScale(2).refreshBody();
    this.platforms = this.physics.add.staticGroup();

    this.movingPlatform = this.physics.add.image(400,400,'GraveYard');

    this.movingPlatform.setImmovable(true);
    this.movingPlatform.body.allowGravity = false;
        // platform movement
        this.movingPlatform.setVelocityX(50);

// Mr.Skelly settings
    this.player = this.physics.add.sprite(100,450,'skelly');

        this.player.setBounce(0.2);
        this.player.setCOllideWorldsBounds(true);

// animation settings
    this.anims.create( {
key: 'left',
frames: this.anims.generateFrameNumbers('skelly',{start: 0, end: 3}),
frameRate: 10,
repeat: -1
 });
 
 this.anims.create({
    key: 'turn',
    frames: [ {key: 'skelly',frame: 4 } ],
    frameRate: 20 
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('skelly',{start: 5, end: 8}),
    frameRate: 10,
    repeat: -1
});

// cursor settings for keyboard
this.cursors = this.imput.keyboard.createCursorKeys();


// item settings AKA Bones
this.bones = this.physics

        }
    }

