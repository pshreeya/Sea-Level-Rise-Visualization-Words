/**
* An croissant word layout to represent France.
* @class
*/
class Croissant extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in a croissant shape  
     *
     * @returns {void}
     */
	constructor(words) {
    super(words);
  }
	/**
     * Displays the words in a croissant layout
     *   
     * @returns {void}
     */
  display() {
    push();
    fill(232, 199, 137); 
    textAlign(CENTER, CENTER);

    let baseRadius = 120; //base radius of crescent
    let arcStart = PI/4; 
    let arcEnd = 3*PI/4;  
    let angleStep = (arcEnd - arcStart) / (this.words.length - 1);

    for (let i = 0; i < this.words.length; i++) {
      textSize(12 * this.sizeFactors[i]); 

      let angle = arcStart + i * angleStep;

      //slight bulge in the middle of the croissant
      let radiusVariation = 10 * sin((PI * i) / this.words.length);
      let radius = baseRadius + radiusVariation;

      let x = radius * cos(angle);
      let y = radius * sin(angle);

      push();
      translate(x, y);
      rotate(angle); //aligning the words in an arc shape
      text(this.words[i], 0, 0);
      pop();
    }

    pop();
  }
}



