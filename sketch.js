const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button, blower;
var bunny;
var blink, eat, sad;
var mute_btn;

var fr, rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  //sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  sad = loadImage("coelhoHEHEHE.jpg");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80, displayHeight);
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }


  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  aEsquerda = createImg('cut_btn.png');
  aEsquerda.position(65, 80);
  aEsquerda.size(50, 50);
  aEsquerda.mouseClicked(drop2);

  aDireitaConfia = createImg('cut_btn.png');
  aDireitaConfia.position(400, 150);
  aDireitaConfia.size(50, 50);
  aDireitaConfia.mouseClicked(drop1);

  porGentilezaCaleABoca = createImg('mute.png');
  porGentilezaCaleABoca.position(440, 30);
  porGentilezaCaleABoca.size(50, 50);
  porGentilezaCaleABoca.mouseClicked(calaABocaPorFavorObrigado);

  balaoComVentoDentro = createImg("balloon.png")
  balaoComVentoDentro.position(30, 300)
  balaoComVentoDentro.size(100, 100)
  balaoComVentoDentro.mouseClicked(ventoMuitoForteSocorro)

  rope = new Rope(7, { x: 245, y: 30 });
  corrente = new Rope(7, { x: 430, y: 150 });
  cordaBR = new Rope(7, { x: 95, y: 80 });

  ground = new Ground(200, canH, width, 20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(230, canH-80, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addImage('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_com = new Link(corrente, fruit);
  fruit_br = new Link(cordaBR, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, displayWidth+80, displayHeight);

  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop();

  rope.show();
  corrente.show()
  cordaBR.show()
  Engine.update(engine);
  ground.show();

  drawSprites();

  if (collide(fruit, bunny) == true) {
    eating_sound.play()
    bunny.changeAnimation('eating');
  }


  if (fruit != null && fruit.position.y >= 650) {
    bunny.changeAnimation('crying');
    fruit = null;
    sad_sound.play()

  }

}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play()
}

function drop1() {
  corrente.break();
  fruit_com.detach();
  fruit_com = null;
  cut_sound.play()
}

function drop2() {
  cordaBR.break();
  fruit_br.detach();
  fruit_br = null;
  cut_sound.play()
}



function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function ventoMuitoForteSocorro() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })
}

function calaABocaPorFavorObrigado() {
  if (bk_song.isPlaying()) {
    bk_song.stop()

  } else {
    bk_song.play()
  }
}

