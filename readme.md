## How to run this node code

Make sure you have node version 8.x or above installed. This was coded on 8.11.1 but
it should work with any machine that is capable of handling ES6 JavaScript. To install
the sleep module, run "npm install" before running the code. 

Run with command "node bathroom.js"

For optimal viewing, increase the size of text and shrink the terminal window such
that only one record is visible at once, causing it to appear to be 'updating'.

## General analysis of the code and starvation

In my code, here is an explanation (in //comments) of the output:

t: 401 - next person:  {f:5} // time and new person created (if one is created)
manQueue:   3 // number of men outside of bathroom
womanQueue:   3
inside: [" {f:1} "," {f:2} "," {f:3} "] // representation of the 3 stalls in bathroom


The code "Math.floor(Math.random() * 4 + 2)" decides how long the person will need to
stay in the bathroom, meaning it is in the interval [2, 5].

The code "Math.floor(Math.random() * 2)" decides whether there will be a new
person on each tick, meaning it is a 50% chance there will be a new person.

With these parameters, and three stalls open, there does tend to be a bit of
starvation, though it rarely lasts more than 12 ticks of the clock. One possible
way of alleviating the starvation when it does happen is to stop allowing
people to enter the restroom when there has been a person waiting for longer than
X ticks. Another way would be to flush people inside back into the queue when the
other gender has been waiting too long (preserving how much longer they need the
restroom for).
