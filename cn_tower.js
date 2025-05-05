/**
* A CN-tower shaped word layout to represent Canada.
* @class
*/
class CNTower extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in CN-tower shape  
     *
     * @returns {void}
     */
  constructor(words) {
    super(words);
  }
  /**
     * Displays the words in a CN-tower shaped layout
     *   
     * @returns {void}
     */
  display() {
    push();
    fill(0); // black tower
    textAlign(CENTER, CENTER);

    let totalWords = this.words.length;
    let third = floor(totalWords / 3);

    //base of tower
    let baseHeight = 20;
    for (let i = 0; i < third; i++) {
      textSize(12 * this.sizeFactors[i]);
      let y = map(i, 0, third - 1, 0, baseHeight);
      let x = map(i, 0, third - 1, -15, 15);
      text(this.words[i], x, y);
    }

    //shaft of tower
    let shaftHeight = 100;
    let shaftY = baseHeight;
    for (let i = third; i < 2 * third; i++) {
      textSize(12 * this.sizeFactors[i]);
      let y = map(i, third, 2 * third - 1, shaftY, shaftY + shaftHeight);
      text(this.words[i], 0, y); // perfectly vertical
    }

    //observation deck of tower
    let deckHeight = 25;
    let deckY = shaftY + shaftHeight;
    for (let i = 2 * third; i < totalWords; i++) {
      textSize(12 * this.sizeFactors[i]);
      let y = map(i, 2 * third, totalWords - 1, deckY, deckY + deckHeight);
      let x = map(i, 2 * third, totalWords - 1, -20, 20);
      text(this.words[i], x, y);
    }

    pop();
  }
}
