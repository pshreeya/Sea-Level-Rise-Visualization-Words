/**
* A christ statue shaped word layout inspired off of Brazil's Christ the Redeemer.
* @class
*/
class ChristStatue extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in christ statue shape  
     *
     * @returns {void}
     */
  constructor(words) {
    super(words);
  }
  /**
     * Displays the words in a christ statue layout
     *   
     * @returns {void}
     */
  display() {
    push();
    fill(177, 179, 177); // gray stone
    textAlign(CENTER, CENTER);

    let positions = [
      {x: 0, y: -80},             // head
      {x: -80, y: -40}, {x: -50, y: -40}, // left arm 
      {x: 50, y: -40}, {x: 80, y: -40},   // right arm 
      {x: 0, y: -20}, {x: 0, y: 0},       // upper body
      {x: 0, y: 30}, {x: 0, y: 60},       // lower body
      {x: -10, y: 80}, {x: 10, y: 80}     // legs/feet slightly split apart
    ];

    for (let i = 0; i < this.words.length && i < positions.length; i++) {
      textSize(12 * this.sizeFactors[i]);  
      text(this.words[i], positions[i].x, positions[i].y);
    }

    pop();
  }
}
