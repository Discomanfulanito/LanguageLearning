const fs = require('fs');
const dfd = require('danfojs-node');

// File paths
const csvFilePath = 'frequency.csv';
const jsonFilePath = 'es-en.json';
const updatedJsonFilePath = 'updated_data.json';

// Load CSV file
dfd.readCSV(csvFilePath).then((csvData) => {
    
    // Read JSON file
    fs.readFile(jsonFilePath, 'utf8', (err, jsonData) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        // Parse JSON data
        let jsonObj = JSON.parse(jsonData);

        // Extract CSV data (word and count) from the DataFrame
        const csvWords = csvData['word'].values;  // Extract 'word' column as an array
        const csvCounts = csvData['count'].values; // Extract 'count' column as an array

        // Convert CSV data to a dictionary (object) for easier lookup
        const csvWordCount = {};
        csvWords.forEach((word, index) => {
            csvWordCount[word] = csvCounts[index];
        });

        // Update JSON object with the count from CSV
        jsonObj = jsonObj.map((item) => {
            const word = item.word;
            if (csvWordCount[word] !== undefined) {
                item.count = csvWordCount[word];  // Add the 'count' attribute
            }
            return item;
        });

        // Write updated JSON to a new file
        fs.writeFile(updatedJsonFilePath, JSON.stringify(jsonObj, null, 2), (err) => {
            if (err) {
                console.error('Error writing updated JSON file:', err);
            } else {
                console.log('Updated JSON file saved successfully as', updatedJsonFilePath);
            }
        });
    });
});
