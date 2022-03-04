/*
NOTES:
  Improve Sets button.
  Add functionality to Set Timer.
  [c] Add functionality to Pause.
  [c] Add functionality to Start Over.
  [c] Make Mobile friendly.
  [c] Add fonts.
  [c][ ] Improve Design into 2.0. ++ Improve UI further
  [c] change its color or fade when countdown begins.
  [c] turn reps into a button to prompt if you want to reset reps only.
  [c] when clicking on sets, add another question to see id the user wants to reset reps per sets.
  add a settings menu > within so far add the ability to change between light and dark mode.
  [c] Disable reps and sets button when counting.
  
  
*/

let theMinutes: number = 0
let theSeconds: number = 3;
let reps: number = 0;
let sets: number = 0;

// the blur that comes up behind the sets pop up
let theBlur = document.createElement("div");
theBlur.style.position = "absolute";
theBlur.style.display = "none";
theBlur.style.left = "0";
theBlur.style.right = "0";
theBlur.style.marginLeft = "auto";
theBlur.style.marginRight = "auto";
theBlur.style.top = "0px";
theBlur.style.height = "1000px";
theBlur.style.width = "100%";
theBlur.style.zIndex = "2";
theBlur.style.opacity = ".8";
theBlur.style.backgroundColor = "black";

document.body.appendChild(theBlur);



let userInput = document.createElement("input");
userInput.setAttribute('type','text');
userInput.style.height = "30px";
userInput.style.marginTop = "10px";
userInput.style.width = "200px";
userInput.style.textAlign = "center";
userInput.style.borderTop = "none";
userInput.style.borderLeft = "none";
userInput.style.borderRight = "none";
userInput.style.fontSize = "20px";
userInput.style.color = "white";
userInput.style.backgroundColor = "#4e0000";



// this displays the min and secs
let theNumbers = document.querySelector(".theNumbers").innerHTML = `${theMinutes}:${theSeconds}`;
// this displays reps number
let theReps = document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
// this displays sets number
let theSets = document.querySelector(".theSets").innerHTML = `Sets: ${sets}`;

// startID and setID is to disable and enable the button during count down.
let startID = document.getElementById("startID");
let setID = document.getElementById("setID");
let pauseID = document.getElementById("pauseID")
// immitiately disables the pause button while counter is not active.
pauseID.disabled = true;

//pops up the sets prompt.
let setsPopUp = document.querySelector(".setsPopUp");
let setInput = document.querySelector(".setInput");
let setTheReps = document.querySelector(".setTheReps");
let resetSet = document.querySelector(".resetSet");
let theValue, intValue, a, starter;

// When the Sets button is clicked, this triggers
let theSetsID = document.getElementById("theSetsID").onclick = function(){
  setsPopUp.style.display = "block";
  theBlur.style.display = "block";
  
  resetSet.onclick = function(){
    intValue = 0;
    sets = 0;
    reps = 0;
    setInput.value = 0;
    theSets = document.querySelector(".theSets").innerHTML = `Sets: ${sets}`;
    theReps = document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
    setsPopUp.style.display = "none";
    theBlur.style.display = "none";
    console.log("This value is: ",intValue)
  }
  
  setInput.addEventListener('change', (e) => {  
    console.log(e.target.value);
    theValue = e.target.value;
    intValue = parseInt(theValue);
    //resets reps after a number of reps per set is added.
    reps = 0;
    theReps = document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
    setsPopUp.style.display = "none";
    theBlur.style.display = "none";
  });
  
  // setTheReps.onclick = function(){
  //   console.log("Here is: " , intValue);
  // }
  
  // removes the pop up and background blur
  theBlur.onclick = function(){
    theBlur.style.display = "none";
    setsPopUp.style.display = "none";
  }
}

let repsQuestion = document.querySelector(".repsQuestion");
let yes = document.querySelector(".yes");
let no = document.querySelector(".no");
// pops up question for reps.
let repsClick = document.querySelector(".repsClick").onclick = function(){
  repsQuestion.style.display = 'block';
  theBlur.style.display = "block";
  
  // resets reps down to 0
  yes.onclick = function(){
    reps = 0;
    theReps = document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
    repsQuestion.style.display = "none";
    theBlur.style.display = "none";
  }
  no.onclick = function(){
    repsQuestion.style.display = "none";
    theBlur.style.display = "none";
  }
  
  // removes the pop up and background blur
  theBlur.onclick = function(){
    repsQuestion.style.display = "none";
    theBlur.style.display = "none";
  }
}

let blockRepsAndSets = document.querySelector(".blockRepsAndSets");
let isPaused;
let pauseBTN = document.querySelector(".pause");
// start BUTTTON
let start = document.querySelector(".start").onclick = function(){
  
  //displays when count down is activated to disable Reps and Sets from being clicked on.
  blockRepsAndSets = document.querySelector(".blockRepsAndSets");
  blockRepsAndSets.style.display = "block";
  
 
  // makes it so that you can pause during the countdown ONLY.
  pauseID.disabled = false;
  isPaused = false;
  
  
  
  starter = setInterval(function(){
   
    if(!isPaused){
      startID.disabled = true;
      setID.disabled = true;
      startID.style.backgroundColor = "gray";
      setID.style.backgroundColor = "gray";
      console.log("Count from reps and sets", reps, sets); // LEFFT OFF HERE.
      theSeconds--;
      document.querySelector(".theNumbers").innerHTML = `${theMinutes}:${theSeconds}`;
    }
   
    // listens to see when the user wants to pause the count down and resume.
    pauseBTN.addEventListener("click",unPause);
    function unPause(){
      isPaused = true;
      pauseBTN.innerHTML = "Resume";
    }
    if(pauseBTN.innerHTML === "Resume"){
      // resumes count down.
      pauseBTN.addEventListener("click",pausing);
    }
    function pausing(){
      isPaused = false;
      pauseBTN.innerHTML = "Pause";
    }
    if(theSeconds <= 0){
      reps += 1;
      console.log(reps);
      
      theSeconds += 2;
      document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
      
      a = setInterval(function(){
        clearInterval(starter);
        blockRepsAndSets.style.display = "none";
        // enables the button again after count renews
        startID.disabled = false;
        setID.disabled = false;
        // disables the pause button when nothing is going on.
        pauseID.disabled = true;
        startID.style.backgroundColor = "#9EDE73";
        setID.style.backgroundColor = "black";
        clearInterval(a);
        
      },1000); // a interval END
      
    }
    
    // bug is here
    // ########## If i set reps, click on start over, and clear sets..sets starts to count instead of reps.
    // Configures the reps and setps
    if(reps == intValue){
      reps = 0;
      sets+=1;
      theSets = document.querySelector(".theSets").innerHTML = `Sets: ${sets}`;
      theReps = document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
    }
  },1000); // starter interval END
  
}// start BUTTON END

// startOver BUTTON
let startOver = document.querySelector(".startOver").onclick = function(){
  // here we reset the timer, pause is not active, 
  theSeconds = 6;
  theNumbers = document.querySelector(".theNumbers").innerHTML = `${theMinutes}:${theSeconds}`;
  blockRepsAndSets.style.display = "none";
  intValue = 0;
  sets = 0;
  //reps = 0;
  setInput.value = 0;
  theSets = document.querySelector(".theSets").innerHTML = `Sets: ${sets}`;
  //theReps = document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
  clearInterval(starter);
  clearInterval(a);
  // enables the button again after count renews
  startID.disabled = false;
  setID.disabled = false;
  isPaused = false;
  pauseBTN.innerHTML = "Pause";
  // disables the pause button when nothing is going on.
  pauseID.disabled = true;
  startID.style.backgroundColor = "#9EDE73";
  setID.style.backgroundColor = "black";
}// startOver onclick end

// set time BUTTON
let setTimer = document.querySelector(".set").onclick = function(){
  
}







