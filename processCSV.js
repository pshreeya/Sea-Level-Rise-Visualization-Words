//let annualData = {};
//let years = [];

/**
 * Preloads the sea level CSV file.
 * @returns {void} 
 */
/**
function preload() {
    table = loadTable("sea_level_rise.csv", "csv", "header");
}
*/
/**
 * Processes the sea level CSV data and calculates yearly average sea level rise per country, stores it in a structured object,
 * and exports it as a CSV file called "annual_sea_level_rise.csv".
 * 
 * @returns {void} 
 */
/**
function processCSV() {
    for (let i = 0; i < table.getRowCount(); i++) {
        let country = table.getString(i, "Country");
        let year = floor(float(table.getString(i, "Satellite Altimetry Year"))); // Extract year
        let seaLevel = table.getString(i, "Satellite Altimetry");

        if (seaLevel !== "") { // Skip empty values
            seaLevel = float(seaLevel);
						//initializes data structure for a new year
            if (!annualData[year]) {
                annualData[year] = {};
                years.push(year);
            }
						//initializes data structure for a new country in that year
            if (!annualData[year][country]) {
                annualData[year][country] = { total: 0, count: 0 };
            }
						//aggregate sea level data
            annualData[year][country].total += seaLevel;
            annualData[year][country].count += 1;
        }
    }

    //convert totals to averages and build CSV string
    let csvOutput = "Year,Country,Average Satellite Altimetry\n";
    years.sort();
    for (let year of years) {
        for (let country in annualData[year]) {
            let avg = annualData[year][country].total / annualData[year][country].count;
            csvOutput += `${year},${country},${avg.toFixed(2)}\n`;
        }
    }
    //saves and exports the modified CSV file 
    saveStrings([csvOutput], "annual_sea_level_rise.csv");
}
*/