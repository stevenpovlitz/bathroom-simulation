class Person {
   constructor(startTime, gender, stayTime = 2) {
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
         this.manQueue.sort(function(a, b) {return b.startTime - a.startTime})
      } else {
         this.womanQueue.push(p1);
         this.womanQueue.sort(function(a, b) {return b.startTime - a.startTime})
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
         const longestWaitWoman = this.womanQueue.length > 1 ? this.womanQueue[this.womanQueue.length-1].startTime : -1;
         const longestWaitMan = this.manQueue.length > 1 ? this.manQueue[this.manQueue.length-1].startTime : -1;

         if (this.inBathroom.length >= this.bathroomMax || longestWaitWoman == -1 && longestWaitMan == -1) {
            continueAdding = false;
         } else if (longestWaitWoman > longestWaitMan && (this.inBathroom.length == 0 || this.inBathroom[0].gender == 'female')) {
            this.inBathroom.push(this.womanQueue.pop());
         } else if (longestWaitMan > longestWaitWoman && (this.inBathroom.length == 0 || this.inBathroom[0].gender == 'male')) {
            this.inBathroom.push(this.manQueue[this.manQueue.length-1]);
         } else {
            continueAdding = false;
         }
      }

   }
   stringify() {
      console.log(`manQueue: ${JSON.stringify(this.manQueue)}\nwomanQueue: ${JSON.stringify(this.womanQueue)}\ninside: ${JSON.stringify(this.inBathroom)}\n`);
   }
}

function runSimulation() {
   let steven = new Person(3, 'male', 1);
   let john = new Person(6, 'male', 2);
   let abby = new Person(8, 'female', 2);
   let sarah = new Person(2, 'female', 2);

   let b1 = new Bathroom();

   b1.wantsToEnter(steven);
   b1.wantsToEnter(john);
   b1.wantsToEnter(sarah);
   b1.wantsToEnter(abby);

   b1.stringify();
   b1.timeTick();
   b1.stringify();
   b1.timeTick();
   b1.stringify();
}

runSimulation();
