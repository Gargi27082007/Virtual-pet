var dog,sadDog,happyDog;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed, feed, addFood;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
   database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food()
  feed = createButton('FEED THE DOG');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton('ADD FOOD');
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  

}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  if (foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


//function to add food in stock
function addFoodS(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}