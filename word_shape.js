/**
* The parent class for all word shapes that handles pulsing animation. 
* @class
*/

class WordShape {
	/**
     * Manages the visual representation of words for a country's shape. Each word shape is assigned a default size factor and a growth direction for dynamic movement.
     * @constructor
     * @param {array} words - the array of words that will be displayed for each country's shape  
     * @returns {void}
     */
  constructor(words = []) {
    this.words = words;
    this.sizeFactors = new Array(this.words.length).fill(1); //size factor per word
    this.growthDirection = new Array(this.words.length).fill(1); 
  }
  /**
     * updates the size factors for the pulsing animation effect.  
     * @returns {void} 
     */
  update() {
    for (let i = 0; i < this.words.length; i++) {
      this.sizeFactors[i] += this.growthDirection[i] * 0.01;
      if (this.sizeFactors[i] > 1.5 || this.sizeFactors[i] < 0.8) {
        this.growthDirection[i] *= -1;
      }
    }
  }
  /**
     * Abstract method to display the shape. If any errors arise with the child class' display(), the below default display is shown. 
     * @returns {void} 
     */
  display() {
    push();
		//displays the following error message
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    textSize(16);
    text("display() not implemented", 0, 0);

    noFill();
    stroke(255, 0, 0);
		//draws a red circle centered at around the origin point
    ellipse(0, 0, 100, 100);

    //each word from this.word is displayed in a vertical stack 
    fill(100); //gray text
    textSize(12);
    for (let i = 0; i < this.words.length; i++) {
			//vertical stack starts at y = 20 and is spaced 15 pixels apart
      text(this.words[i], 0, i * 15 + 20);
    }
    pop();
  }
}
