let img_clicked = [];
let dir_clicked = [];
let cnt = 0;
let click = 0;
let stp = false;

function turn(dir, image){
  // dir = An string indicating which card it will be modified
  // image = An string indicating the icon/image that will be asigned to the card

  // Select the card
  let box = document.querySelector(dir);
  box.addEventListener('click', function(){
    // When the card is clicked, add 1 to the counter of clicks
    // and change the text of the HTML
    click += 1;
    document.querySelector(".movements").innerText = "Clicks: " + click;
    // Add the image to the card when is clicked
    box.style.backgroundImage = "url('images/" + image + ".svg')";
    // Save the image and the card selected
    img_clicked.push(image);
    dir_clicked.push(dir);
    // If the player has clicked in 2 cards
    if (img_clicked.length === 2){
      let a = dir_clicked[0];
      let b = img_clicked[0];
      // Clean both arrays
      img_clicked = [];
      dir_clicked = [];
      let box2 = document.querySelector(a);
      // If both cards have different images
      if (b != image){
        //'WRONG' ANIMATION
        box.style.backgroundColor = "#f44336";
        box2.style.backgroundColor = "#f44336";
        box.style.animation = "shake 0.7s";
        box2.style.animation = "shake 0.7s";
        // After 400 miliseconds, flip both cards face down
        setTimeout(function(){
          box.style.backgroundImage = "url('images/udacity-logo.png')";
          box2.style.backgroundImage = "url('images/udacity-logo.png')";
          box.style.backgroundColor = "#003366";
          box2.style.backgroundColor = "#003366";
          box.style.removeProperty('animation');
          box2.style.removeProperty('animation');
        },400);
        // Add again another event listener for those cards
        turn(a,b);
        turn(dir,image);

      } else{
        //'CORRECT' ANIMATION
        box.style.backgroundColor = "#4CAF50";
        box2.style.backgroundColor = "#4CAF50";
        // Add 1 to the number of correct card pairs
        cnt += 1;
        // If the player has found the 8 correct pairs
        if (cnt === 8){
          cnt = 0;
          click = 0;
          //Change to the FINAL PANEL
          document.querySelector(".congr").style.display = "block";
          document.querySelector(".main_table").style.display = "none";
          // Stop the timer
          stp = true;
        }
      }
    }
  }, {once : true}); //The event listener is only for 1 click

}

//TIMER
let start = new Date().getTime();
function timer(){
  let start = new Date().getTime();
  var x = setInterval(function() {

    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = now - start;

    // Time calculations for hours, minutes and seconds
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.querySelector(".timer").innerHTML = hours + "h "  + minutes + "m " + seconds + "s ";

    // If the game is over, stop the timer
    if (stp === true){
      clearInterval(x);
      stp = false;
    }

    // Number of stars obtained
    // Less than 20 seconds, 3 stars
    // Between 20 and 30 seconds, 2 stars
    // Between 30 and 40 seconds, 1 star
    // More than 40 seconds, 0 stars
    if (distance >= 20000 && distance < 21000){
      document.querySelector(".fas").classList.remove("fas");
    } else if (distance >= 30000 && distance < 31000){
      document.querySelector(".fas").classList.remove("fas");
    } else if (distance >= 40000 && distance < 41000){
      document.querySelector(".fas").classList.remove("fas");
    }

  }, 1000);
}


// RANDOMLY INITIALIZE THE GAME

function shuffle(){
  let arr = []
  // Obtain an array of length 16 with numbers
  // from 0 to 15 randomly ordered
  while(arr.length < 16){
    let randomnumber = Math.floor(Math.random()*16);
    if(arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
  }
  console.log(arr);
  return arr;
}

// START THE GAME

  let numb = shuffle();

  //Create the array [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  let ind = [];
  for (let i = 1; i <= 16; i++) {
    ind.push(i);
  }

  // For each card, add an event listener and an image
  const icons = ["atom","css","angular","code","firefox","html5","js","mobile","atom","css","angular","code","firefox","html5","js","mobile"];
  for (let i of ind){
    turn("#square" + i, icons[numb[i - 1]]);
  }

  //Put the timer on
  timer();
