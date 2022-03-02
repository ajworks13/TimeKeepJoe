/*
NOTES:
  Improve Sets button.
  Add functionality to Set Timer.
  [c] Add functionality to Pause.
  [c] Add functionality to Start Over.
  [c] Make Mobile friendly.
  [c] Add fonts.
  [c] Improve Design into 2.0.
  [c] change its color or fade when countdown begins.
  
*/

let theMinutes: number = 0
let theSeconds: number = 30;
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

// the div pop up for the user to input reps per set.
let setDiv = document.createElement("div");
setDiv.style.position = "absolute";
setDiv.style.display = "none";
setDiv.style.left = "0";
setDiv.style.right = "0";
setDiv.style.marginLeft = "auto";
setDiv.style.marginRight = "auto";
setDiv.style.top = "50px";
setDiv.style.height = "100px";
setDiv.style.width = "300px";
setDiv.style.backgroundColor = "brown";
setDiv.style.zIndex = "3";
setDiv.style.fontSize = "20px";
setDiv.style.fontWeight = "bold";
setDiv.style.textAlign = "center";
setDiv.style.paddingTop = "5px";
setDiv.innerHTML = "How many Reps per Sets?";

document.getElementById("theSetWindowID").appendChild(setDiv);

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

setDiv.appendChild(userInput);

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

// When the Sets button is clicked, this triggers
let theSetsID = document.getElementById("theSetsID").onclick = function(){
  console.log("yo");
  setDiv.style.display = "block";
  theBlur.style.display = "block";
  
  // removes the pop up and background blur
  theBlur.onclick = function(){
    theBlur.style.display = "none";
    setDiv.style.display = "none";
  }
}


// start BUTTTON
let start = document.querySelector(".start").onclick = function(){
  // startOver BUTTON
  let startOver = document.querySelector(".startOver").onclick = function(){
      // here we reset the timer, pause is not active, 
      theSeconds = 30;
      theNumbers = document.querySelector(".theNumbers").innerHTML = `${theMinutes}:${theSeconds}`;
      clearInterval(starter);
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
  
  // makes it so that you can pause during the countdown ONLY.
  pauseID.disabled = false;
  let isPaused = false;
  let pauseBTN = document.querySelector(".pause");
  
  
  let starter = setInterval(function(){
   
    if(!isPaused){
      startID.disabled = true;
      setID.disabled = true;
      startID.style.backgroundColor = "gray";
      setID.style.backgroundColor = "gray";
    
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
      theSeconds += 31;
      document.querySelector(".theReps").innerHTML = `Reps: ${reps}`;
      
      var a = setInterval(function(){
        clearInterval(starter);
        
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
  },1000); // starter interval END
  
}// start BUTTON END

// set time BUTTON
let setTimer = document.querySelector(".set").onclick = function(){
  
}







