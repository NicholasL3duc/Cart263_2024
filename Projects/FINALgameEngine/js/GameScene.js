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



        }
    }

