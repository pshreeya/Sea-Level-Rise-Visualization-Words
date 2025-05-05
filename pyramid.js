/**
* A pyramid word layout to represent Egypt.
* @class
*/
class Pyramid extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in pyramid shape  
     *
     * @returns {void}
     */
  constructor(words) {
    super(words);
  }
  /**
     * Displays the words in a pyramid layout
     *   
     * @returns {void}
     */
  display() {
    push();
    fill(247, 216, 62); 
    textAlign(CENTER, CENTER);

    let levels = Math.ceil((-1 + Math.sqrt(1 + 8 * this.words.length)) / 2); // number of levels
    let wordIndex = 0;
    let rowHeight = 30;
    let startY = -levels * rowHeight / 2;

    for (let i = 0; i < levels; i++) {
      let wordsInRow = i + 1;
      let y = startY + i * rowHeight;
      let rowWidth = wordsInRow * 50; 
      let startX = -rowWidth / 2 + 25;

      for (let j = 0; j < wordsInRow && wordIndex < this.words.length; j++) {
        let x = startX + j * 50;
        textSize(12 * this.sizeFactors[wordIndex]);
        fill(255, 215, 0); 
        text(this.words[wordIndex], x, y);
        wordIndex++;
      }
    }

    pop();
  }
}
