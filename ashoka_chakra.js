/**
* An ashoka chakra word layout inspired off of India's flag.
* @class
*/
class AshokaChakra extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in an ashoka chakra shape  
     *
     * @returns {void}
     */
  constructor(words) {
    super(words);
  }
  /**
     * Displays the words in a ashoka chakra layout
     *   
     * @returns {void}
     */
  display() {
    push();
    fill(0, 0, 205); 
    textAlign(CENTER, CENTER);

    let baseRadius = this.radius || 70;
    let angleStep = TWO_PI / this.words.length;

    for (let i = 0; i < this.words.length; i++) {
      textSize(12 * this.sizeFactors[i]);

      let angle = i * angleStep;
      let x = baseRadius * cos(angle);
      let y = baseRadius * sin(angle);

      //draw spokes from center to point
      stroke(0, 0, 205, 100);
      line(0, 0, x, y);
      noStroke();

      //moves to a point on circle and rotates the words along the circular path
      push();
      translate(x, y);
      rotate(angle + HALF_PI); 
      text(this.words[i], 0, 0);
      pop();
    }

    pop();
  }
}
