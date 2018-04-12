let manQueue = [];
let womanQueue = [];
let bathroom = {
   numStalls: 2,
   numInside: 0,
   genderInside: 'empty', // empty, male, female
   toString: function() {
      console.log(`numStalls: ${this.numStalls}`)
   }
}

// todo: refactor this as object oriented code via functions inside the bathroom object - much cleaner

function addToQueue(isMale, tickNumber) {
   if (isMale) {
      manQueue.push(tickNumber);
      manQueue.sort(function(a,b) {
         return b-a;
      });
   } else {
      womanQueue.push(tickNumber);
      womanQueue.sort(function(a,b) {
         return b-a;
      });
   }
}

function manWantsToEnter(tickNum) {
   if (bathroom.genderInside == 'female') {
      addToQueue(true, tickNum);
   } else if (bathroom.genderInside == 'male') {
      if (bathroom.numInside < bathroom.numStalls) {
         bathroom.numInside++;
      }
   } else {
      bathroom.genderInside
   }
}

function womanWantsToEnter(tickNum) {

}

// nice console output of current status
function displayBathroom() {
   console.log(`Bathroom:\n${JSON.stringify(bathroom)}`);
   console.log(`manQueue: [${manQueue}]\nwomanQueue: [${womanQueue}]`);
}

function runSimulation() {
   addToQueue(true, 2);
   addToQueue(false, 3);
   addToQueue(true, 1);
   displayBathroom();
}

runSimulation();
