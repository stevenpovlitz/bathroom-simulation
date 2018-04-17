let sleep = require('sleep'); // allows for blocking of code (for 1 second ticks)

class Person {
   constructor(startTime, gender, stayTime = 3) {
      this.startTime = startTime;
      this.gender = gender;
      this.stayTime = stayTime;
   }
}

class Bathroom {
   constructor(bathroomMax = 3) {
      this.manQueue = [];
      this.womanQueue = [];
      this.inBathroom = [];
      this.bathroomMax = bathroomMax;
   }
   // a person wants to enter
   wantsToEnter(p1) {
      if (this.inBathroom.length == 0 || this.inBathroom.length < this.bathroomMax && this.inBathroom[0].gender == p1.gender) {
         this.inBathroom.push(p1);
      } else {
         this.addToQueue(p1);
      }
   }
   // add a person to the appropriate queue
   addToQueue(p1) {
      if (p1.gender == 'male') {
         this.manQueue.push(p1);
         this.manQueue.sort(function(a, b) {return a.startTime - b.startTime})
      } else {
         this.womanQueue.push(p1);
         this.womanQueue.sort(function(a, b) {return a.startTime - b.startTime})
      }
   }
   // remove people from bathroom, then fill up all slots from appropriate queue if possible
   timeTick() {
      // deinc stayTime, remove people who are done
      for (let i = this.inBathroom.length - 1; i >= 0; i--) {
         this.inBathroom[i].stayTime--;
         if (this.inBathroom[i].stayTime <= 0) {
            this.inBathroom.splice(i, 1);
         }
      }

      // below code adds the appropriate people from appropriate queue until an exit condition
      // such as being full or the correct queue being empty
      let continueAdding = true;
      while (continueAdding) {
         const longestWaitWoman = this.womanQueue.length > 0 ? this.womanQueue[this.womanQueue.length-1].startTime : -1;
         const longestWaitMan = this.manQueue.length > 0 ? this.manQueue[this.manQueue.length-1].startTime : -1;

         if (this.inBathroom.length >= this.bathroomMax || longestWaitWoman == -1 && longestWaitMan == -1) {
            continueAdding = false;
         } else if ((longestWaitWoman >= longestWaitMan && this.inBathroom.length == 0) || (this.inBathroom.length > 0 && this.inBathroom[0].gender == 'female' && longestWaitWoman != -1)) {
            this.inBathroom.push(this.womanQueue.pop());
         } else if ((longestWaitMan >= longestWaitWoman && this.inBathroom.length == 0) || (this.inBathroom.length > 0 && this.inBathroom[0].gender == 'male' && longestWaitMan != -1)) {
            this.inBathroom.push(this.manQueue.pop());
         } else {
            continueAdding = false;
         }
      }

   }
   stringify() {
      console.log(`manQueue: ${String(this.manQueue.length).padStart(3)}\nwomanQueue: ${String(this.womanQueue.length).padStart(3)}\ninside: ${JSON.stringify(this.inBathroom.map(prettyPeople))}\n`);
      console.log('\n\n\n\n\n\n\n\n\n\n\n');
   }
}

// allows displaying a person object in a simple, 'pretty' way like this: ' {m:4} '
function prettyPeople(a) {
   return ` {${a.gender[0]}:${a.stayTime}} `
}

function runSimulation() {
   let b1 = new Bathroom();
   let tick = 1; // will inc with each run of the loop
   while (true) {
      if ( Math.floor(Math.random() * 2) ) {
         let p1 = new Person(tick, Math.floor(Math.random() * 2) == 0 ? 'male' : 'female', Math.floor(Math.random() * 4 + 2));
         console.log(`t: ${String(tick).padStart(2)}` + ' - next person: ' + prettyPeople(p1));
         b1.wantsToEnter(p1);
      } else {
         console.log(`t: ${String(tick).padStart(2)}` + ' - no next person');
      }
      b1.stringify();
      // console.log(JSON.stringify(b1) + "\n\n"); // DEBUG
      b1.timeTick();
      tick++;
      sleep.sleep(1);
   }
}

runSimulation();
