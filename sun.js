/**
* A sun word layout to represent Barbados.
* @class
*/
class Sun extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in a sun shape  
     *
     * @returns {void}
     */
  constructor(words) {
    super(words);
  }
  /**
     * Displays the words in a sun layout
     *   
     * @returns {void}
     */
  display() {
    push();
    textAlign(CENTER, CENTER);
    let baseRadius = 70;
    let centerX = 0;
    let centerY = 0;
    let totalWords = this.words.length;

    for (let i = 0; i < totalWords; i++) {
      let angle = TWO_PI * i / totalWords;
      let x = centerX + baseRadius * cos(angle);
      let y = centerY + baseRadius * sin(angle);

      //sunrays starts at circle edge and extends outward
      let rayLength = 20;
      let rayX = x + rayLength * cos(angle);
      let rayY = y + rayLength * sin(angle);

      //draws the sunrays
      stroke(255, 140, 0);
      strokeWeight(1.5);
      line(x, y, rayX, rayY);

      //draws the words on circumference
      noStroke();
      fill(250, 162, 67);
      textSize(12 * this.sizeFactors[i]);

      push();
      translate(x, y);
      rotate(angle + HALF_PI);
      text(this.words[i], 0, 0);
      pop();
    }

    pop();
  }
}
