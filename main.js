/*
  Name: Sea Level Rise Data Words Visualization
  Purpose: To visualize data of the rise of sea levels from 1993 to 2024 using words.
  Author:  Shreeya Prasanna
  Created: 11-April-2025
  Updated: 17-April-2025
  Data obtained from: US Gouvernment https://earth.gov/sealevel/sea-level-explorer/
*/

let table;
let currentYear = 1993;
let countryData = {};
let countryWords = {};
let shapes = {};
let showStart = true;
let prevButton, nextButton;
let loadedCountries = 0;

let lines, markov, data1, data2;
let generatedText = " ";


let countryKeywords = {
  'Canada': 'maple',
  'Solomon Islands': 'lagoon',
  'Brazil': 'jungle',
  'Egypt': 'tomb',
  'UAE': 'camel',
  'India': 'guru',
  'France': 'café',
  'Australia': 'reef',
  'Barbados': 'beach'
};

/**
 * Preloads the required the sea level CSV and two text files for RiTa Markov generation before the sketch starts.
 * 
 * @returns {void} 
 */
function preload() {
  table = loadTable('annual_sea_level_rise.csv', 'csv', 'header');
	data1 = loadStrings('data1.txt'); 
  data2 = loadStrings('data2.txt');
}

/**
  * Initializes the sketch environment and loads the RiTa Markov model.
  *
  * @returns {void} 
  */
function setup() {
  createCanvas(windowWidth, windowHeight);
  fetchAllCountryWords(); 
	
  //creates 'year' navigation buttons
  prevButton = createButton('Previous Year');
  nextButton = createButton('Next Year');
	prevButton.position((width / 2 - 200), 20);
  nextButton.position((width / 2 + 100), 20);
  prevButton.hide();
  nextButton.hide();
	
	//initializes RiTa Markov chain generator 
	lines = ["click to (re)generate"];
	//setting order as n=4
  markov = RiTa.markov(4);
  // Loads the text from both files 
  markov.addText(data1.join(' '));
  markov.addText(data2.join(' '));

	generateText();
}

/**
  * Adjusts the canvas when window size changes.
  *
  * @returns {void} 
  */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
  * Handles rendering of visulization, scene-switching and animated word shapes.
  *
  * @returns {void} 
  */
function draw() {
  background(255);
  textAlign(CENTER, TOP);
	
	//controls 'loading' text display in case loading/setup phases takes some time
	if (!shapesReady()) {
    textSize(24);
    text('Loading...', width / 2, height / 2);
    return;
  }
	
	//creates the first scene
	if (showStart) {
    textSize(32);
		//provides context about the data visualization
    text('Sea Level Rise from 1993-2024', width / 2, 40);
    textSize(20);
    text('Click anywhere to start', width / 2, 80);
		
		return; 
  }
	
  //displays current year and environmental message
	textSize(32);
	let yearTextHeight = 23;
	text('Year: ' + currentYear, width / 2, 20);
	
	//ensures the message appears below the 'year' text with appropriate spacing
  let generatedTextY = 20 + yearTextHeight + 20; 
	let maxWidth = 350; 
  let maxHeight = height - generatedTextY - 20; 
	
  textSize(14);
	//calls the generateText function to make the message appear
  text(generatedText, 600, generatedTextY, maxWidth, maxHeight);

	//draws country-symbolic shapes in a 3-column grid layout
	let countries = Object.keys(countryKeywords);
	let cols = 3;
	let rows = ceil(countries.length / cols);
	let spacingX = width / (cols + 1);
	let spacingY = height / (rows + 2);

	for (let i = 0; i < countries.length; i++) {
		let country = countries[i];
		let info = countryData[currentYear][country];

		if (!info) continue;

		let col = i % cols;
		let rowIndex = floor(i / cols);
		let x = spacingX * (col + 1);
		let y = spacingY * (rowIndex + 1);

		//adjusts the spacing above the first row to avoid overlap with 'year' text and buttons
			if (rowIndex === 0) {
				y += 100;
			}
    
		//manually adjusts the y-position for animated word shapes to avoid overlap
		if (country === 'Canada') {
				y -= 100; //moves it up
			}
		
		if (country === 'Egypt') {
				y += 100; //moves it down
			}
		
		if (country === 'France') {
				y -= 20; 
			}
		
		if (country === 'Solomon Islands') {
				y += 50;
			}
		
		if (country === 'UAE') {
				y += 110; 
			}
		
		if (country === 'Australia') {
				y += 100; 
			}
		
		if (country === 'Brazil') {
				y -= 55; 
			}
		
		if (country === 'India') {
				y += 80; 
			}
		
		if (country === 'Barbados') {
				y += 120; 
			}
		
		push();
		translate(x, y);
		//controls the size and pulsing effect of the animated word shapes
		scale(min(info.sizeFactor, 2)); 
		info.shape.update();
		info.shape.display(info.words, 0.5); 
		pop();
  }
}

/**
  * Manages mouse interaction on start screen to trigger main visualization.
  *
  * @returns {void} 
  */
function mousePressed() {
  if (showStart && shapesReady()) {
		//executes the following only when scenes is switched from 'start' scene 
    showStart = false;
		
		//adjusts positions of the 'year' navigation buttons
		prevButton.position((width / 2 - 200), 20);
    nextButton.position((width / 2 + 100), 20);
		
		//shows the buttons
    prevButton.show();
    nextButton.show();
    
		//controls button functionality
    prevButton.mousePressed(() => changeYear(-1));
    nextButton.mousePressed(() => changeYear(1));
		
		//ensures display of RiTa Markov text generation
		generateText();
  } 
}

/**
  *Generates a Markov-based sentence to accompany the visualization.
  *
  * @returns {void} 
  */
function generateText() {
  //generates text to show urgency of the sea level rise issue based on the current year
  lines = markov.generate(1.5);
  generatedText = lines.join(' ');
  y = 80; 
}

/**
  *changes the current year by a given step and regenerates text.
  *
	* @param {number} step - number of years to shift (+1 or -1)
	*
  * @returns {void} 
  */
function changeYear(step) {
  let newYear = currentYear + step;
  if (countryData[newYear]) {
    currentYear = newYear;
		generateText(); //regenerates the RiTa Markov text only when year changes
  }
}

/**
  * Checks if all country word lists and shapes have been loaded.
  *
  * @returns {boolean} - whether all animated word shapes and country-associated words are ready for display.
  */
function shapesReady() {
  return Object.keys(countryKeywords).every(c => countryWords[c] && shapes[c]);
}

/**
  * Processes the CSV data into a structured object and calculates visual size factor from the difference of annual sea level values.
  *
  * @returns {void} 
  */
function processData() {
  let previousSeaLevel = {};
  
	//processes the CSV data
  for (let row of table.rows) {
    let year = int(row.get('Year')); 
    let country = row.get('Country'); 
    let seaLevelRise = float(row.get('Average Satellite Altimetry')); //extracts sea level value for a particular year

    if (!countryData[year]) countryData[year] = {};
    
    if (countryKeywords[country] && countryWords[country]) {
      let words = countryWords[country]; //pre-fetched related words
      let shape = getShapeForCountry(country); //retrieves shape object for the country
			
      //calculates visual scaling factor based on change from previous year
      let sizeFactor = 1;
      if (previousSeaLevel[country] !== undefined) {
        let delta = seaLevelRise - previousSeaLevel[country];
        sizeFactor = map(delta, -7, 7, 0.8, 1.1);
        sizeFactor = constrain(sizeFactor, 0.8, 1.2); //clamps the scale factor within a visual range
      }
			
      //store current sea level as previous for next iteration
      previousSeaLevel[country] = seaLevelRise;
      
			//stores the processed data for visualization use
      countryData[year][country] = {
        seaLevelRise,
        words,
        shape,
        sizeFactor
      };
    }
  }
}

/**
  * Fetches related words for each country's word shape based on their respective intialized keyword from the Wordnik API.
  *
  * @returns {void} 
  */
function fetchAllCountryWords() {
  for (let country in countryKeywords) {
    let keyword = countryKeywords[country]; //gets keyword representing country
    let url = `https://api.wordnik.com/v4/word.json/${keyword}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=vr64p5wcw7uog9d9lywbmqlg19v7t30x4glsmekg7n184ydwa`; //initializes WordNik API query
    
		//fetch related words asynchronously from Wordnik
    loadJSON(url, (data) => {
      let words = [];
      for (let rel of data) {
        if (rel.words) words = words.concat(rel.words); //merge words from all relationship types
      }
      countryWords[country] = words.slice(0, 10); //keep to max 10 words
      shapes[country] = getShapeForCountry(country);
			loadedCountries++; //tracks how many countries have been loaded
      
			//only process data once all countries' words and shapes are ready
      if (loadedCountries === Object.keys(countryKeywords).length) {
        processData(); 
      }
    });
  }
}

/**
  * Returns the shape object associated with a specific country.
  *
	* @param {string} country - the name of the country
	*
  * @returns {Object} - a wordshape object
  */
function getShapeForCountry(country) {
	let words = countryWords[country] || []; //fallback to empty array if words missing
  //return a new object instance for each countries' specific shapes 
	switch (country) {
    case 'Canada': return new CNTower(words);
    case 'Solomon Islands': return new PalmTree(words);
    case 'Brazil': return new ChristStatue(words);
    case 'Egypt': return new Pyramid(words);
    case 'UAE': return new GoldenFalcon(words);
    case 'India': return new AshokaChakra(words);
    case 'France': return new Croissant(words);
    case 'Australia': return new Fish(words);
    case 'Barbados': return new Sun(words);
    default: return new WordShape(countryWords[country]); //generic shape if no specific match
  }
}