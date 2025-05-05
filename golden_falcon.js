/**
* A golden falcon shaped word layout inspired off of UAE's emblem.
* @class
*/
class GoldenFalcon extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in golden falcon shape  
     *
     * @returns {void}
     */
  constructor(words) {
    super(words);
  }
  /**
     * Displays the words in a golden falcon layout
     *   
     * @returns {void}
     */
  display() {
    push();
    fill(219, 188, 31); 
    textAlign(CENTER, CENTER);

    // Define falcon-inspired layout
    let positions = [
      {x: 0, y: -70}, // head
      {x: -60, y: -40}, {x: 60, y: -40}, // upper wings
      {x: -80, y: -10}, {x: 80, y: -10}, // mid wings
      {x: -60, y: 20}, {x: 60, y: 20},  // lower wings
      {x: 0, y: -30}, // chest/neck
      {x: 0, y: 0},  // body
      {x: 0, y: 30}, // lower body
      {x: -20, y: 60}, {x: 0, y: 65}, {x: 20, y: 60} // tail feathers
    ];

    for (let i = 0; i < this.words.length && i < positions.length; i++) {
      let {x, y} = positions[i];
      textSize(12 * this.sizeFactors[i]); 
      text(this.words[i], x, y);
    }

    pop();
  }
}
