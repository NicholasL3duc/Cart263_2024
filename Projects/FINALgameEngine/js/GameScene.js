class GameScene extends Phaser.Scene {

// Scenes
skelly;
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
    this.skelly = this.physics.add.sprite(100,450,'skelly');

        this.skelly.setBounce(0.2);
        this.skelly.setCOllideWorldsBounds(true);

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
this.bones = this.physics.add.group({
    key: 'bones',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70}
});
{
    bones.setBounceY(phaser.Math.FloatBetween(0.4, 0.8));
}

// collider settings for both skelly and items

this.physics.add.collider(this.skelly, this.platforms); 
this.physics.add.collider(this.skelly, this.movingPlatform);
this.physics.add.collider(this.bones, this.platforms);
this.physics.add.collider(this.bones, this.movingPlatform);

this.add.overlap(this.skelly, this.bones, this.collectBones, null, this)
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


    }

