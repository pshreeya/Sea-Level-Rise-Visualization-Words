/**
* A fish word layout to represent Australia.
* @class
*/
class Fish extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in a fish shape  
     *
     * @returns {void}
     */
	constructor(words) {
    super(words);
  }
	/**
     * Displays the words in a fish layout
     *   
     * @returns {void}
     */
  display() {
    push();
    fill(58, 240, 133); 
    textAlign(CENTER, CENTER);

    //curved fish body coordinates
    let bodyPositions = [
        {x: -60, y: 0}, {x: -40, y: 20}, {x: -20, y: 40},
        {x: 0, y: 50}, {x: 20, y: 40}, {x: 40, y: 20}, {x: 60, y: 0},
        {x: 40, y: -20}, {x: 20, y: -40}, {x: 0, y: -50},
        {x: -20, y: -40}, {x: -40, y: -20} 
    ];

    //fish tail coordinates 
    let tailPositions = [
        {x: -70, y: -10}, {x: -80, y: 0}, {x: -70, y: 10} 
    ];

    //position the "eye" of the fish
    let eyePosition = {x: 10, y: 20}; 

    //draw the body and tail of the fish using words
    let i = 0;
    for (; i < bodyPositions.length && i < this.words.length; i++) {
			textSize(12 * this.sizeFactors[i]);  
			text(this.words[i], bodyPositions[i].x, bodyPositions[i].y);
		}

    //adds words to the tail if there are any left
    for (let j = 0; i < this.words.length && j < tailPositions.length; j++, i++) {
			  textSize(12 * this.sizeFactors[i]);  
        text(this.words[i], tailPositions[j].x, tailPositions[j].y);
    }

    //add the "eye" of the fish
    if (i < this.words.length) {
			textSize(12 * this.sizeFactors[i]);
			text(this.words[i], eyePosition.x, eyePosition.y);
		}
    pop();
  }
}

