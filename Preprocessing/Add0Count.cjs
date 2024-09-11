const fs = require('fs');
const dfd = require('danfojs-node');
const path = require('path');

// File paths
const jsonFilePath = path.join('LanguageLearning', 'LanguageData', 'Spanish', 'dict.json');
const csvFilePath = path.join('LanguageLearning', 'LanguageData', 'Spanish', 'frequency.csv');

// Read JSON file
let dictData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Read CSV file
dfd.readCSV(csvFilePath).then(df => {
    const rows = dfd.toJSON(df, { format: 'row' });

    rows.forEach(row => {
        const originalWord = row['word'];
        const links = row['usage'].split('|').map(link => link.split(':')[1]); // Extracting linked words

        links.forEach(linkedWord => {
            let found = false;
            
            // Check if linkedWord exists in dictionary
            dictData.forEach(entry => {
                if (entry.word === linkedWord) {
                    // Update the link attribute
                    entry.link = originalWord;
                    found = true;
                }
            });

            // If not found, create a new entry
            if (!found) {
                dictData.push({
                    word: linkedWord,
                    pos: 'unknown', // Assuming 'pos' is unknown here; you can adjust accordingly
                    meta: 'unknown', // Same for 'meta'
                    g: 'unknown', // Same for 'g'
                    etymology: 'unknown', // Same for 'etymology'
                    gloss: [], // Empty gloss; you can adjust accordingly
                    count: 0, // Default count
                    link: originalWord
                });
            }
        });
    });

    // Write updated JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(dictData, null, 2), 'utf8');
    console.log('JSON file updated successfully.');
}).catch(err => {
    console.error('Error processing CSV file:', err);
});
