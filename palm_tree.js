/**
* A palm tree shaped word layout to represent Solomon Islands.
* @class
*/
class PalmTree extends WordShape {
	/**
     * @constructor
     * @param {string} words - words displayed in palm tree shape  
     *
     * @returns {void}
     */
  constructor(words) {
    super(words);
  }
  /**
     * Displays the words in a palm tree layout
     *   
     * @returns {void}
     */
  display() {
    push();
    textAlign(CENTER, CENTER);
    
    //palm tree fronds
    fill(34, 139, 34); 
    let frondPositions = [
      {x: -60, y: -80}, {x: -40, y: -90}, {x: -20, y: -95}, {x: 0, y: -100},
      {x: 20, y: -95}, {x: 40, y: -90}, {x: 60, y: -80}
    ];

    for (let i = 0; i < frondPositions.length && i < this.words.length; i++) {
      textSize(12 * this.sizeFactors[i]);
      text(this.words[i], frondPositions[i].x, frondPositions[i].y);
    }

    //palm tree trunk 
    fill(139, 69, 19); 
    let trunkStart = frondPositions.length;
    for (let i = 0; i < 6; i++) {
      let xOffset = sin(i * 0.5) * 5; 
      let y = -60 + i * 25;
      let wordIndex = trunkStart + i;
      if (wordIndex < this.words.length) {
        textSize(16 * this.sizeFactors[wordIndex]);
        text(this.words[wordIndex], xOffset, y);
      }
    }

    pop();
  }
}
