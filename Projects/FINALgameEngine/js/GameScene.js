class GameScene extends Phaser.Scene {

// Scenes
skelly;
bones;
cursor;
platforms;
movingPlatform;

preload()
{
    this.load.image('sky','assets/images/Graveyard.png')
    this.load.image('platform','assets/images/platform.png')
    this.load.image('bones','assets/images/bones.png')
    this.load.spritesheet('skelly','assets/images/Download8683.png',{ frameWidth: 32, frameHeight: 48 });
// NOTE : fix this later Nick (dumbass)

}
create ()
{
this.add.image (400,300,'sky');

// platform settings 
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400,568,'platform').setScale(2).refreshBody();
    

    this.movingPlatform = this.physics.add.image(400,400,'platform');

    this.movingPlatform.setImmovable(true);
    this.movingPlatform.body.allowGravity = false;
        // platform movement
        this.movingPlatform.setVelocityX(50);

// Mr.Skelly settings
    this.skelly = this.physics.add.sprite(100,450,'skelly');

        this.skelly.setBounce(0.2);
        this.skelly.setCollideWorldBounds(true);

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
this.cursors = this.input.keyboard.createCursorKeys();


// item settings AKA Bones
this.bones = this.physics.add.group({
    key: 'bones',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70}
});
for (const bones of this.bones.getChildren())
{
    bones.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
}

// collider settings for both skelly and items

this.physics.add.collider(this.skelly, this.platforms); 
this.physics.add.collider(this.skelly, this.movingPlatform);
this.physics.add.collider(this.bones, this.platforms);
this.physics.add.collider(this.bones, this.movingPlatform);

this.physics.add.overlap(this.skelly, this.bones, this.collectBones, null, this)
 }

 update ()
 {

    const { left,right,up } = this.cursors;
    
    if (left.isDown)
{
    this.skelly.setVelocityX(-160);
    this.skelly.anims.play('left',true);
}
else if (right.isDown)
{
    this.skelly.setVelocityX(160);
    this.skelly.anims.play('right',true);
}
else
{
this.skelly.setVelocityX(0);
this.skelly.anims.play('turn');
}

if(up.isDown && this.skelly.body.touching.down)
{
    this.skelly.setVelocityY(-330);
}
if (this.movingPlatform.x >= 500)
{
    this.movingPlatform.setVelocityX(-50);
}
else if (this.movingPlatform.x <= 300)
{
    this.movingPlatform.setVelocityX(50);
}
 }

 collectBones (skelly, bones)
 {
    bones.disableBody(true,true)
 }

    }
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-example',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: GameScene
    };
    
    const game = new Phaser.Game(config);

