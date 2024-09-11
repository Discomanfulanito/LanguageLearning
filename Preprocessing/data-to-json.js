const fs = require('fs');
const dfd = require('danfojs-node');

// Assuming .data file is a text-based format (CSV, TSV, or similar)
const data = fs.readFileSync('es-en.data', 'utf-8');

// Step 1: Split the data into entries
const entries = data.trim().split('_____').filter(Boolean);

// Step 2: Parse each entry and handle multiple POS instances
const parsedEntries = entries.flatMap(entry => {
  const lines = entry.trim().split('\n');
  const word = lines[0].trim(); // The first line is the word
  const attributes = [];

  // Extract POS and their details
  let currentPOS = null;
  lines.slice(1).forEach(line => {
    if (line.startsWith('pos:')) {
      if (currentPOS) attributes.push({ word, ...currentPOS });
      currentPOS = {
        pos: line.split(':')[1].trim(),
        meta: null,
        g: null,
        etymology: null,
        gloss: null
    };
    } else if (line.startsWith('  meta:')) {
      if (currentPOS) currentPOS.meta = line.split(':')[1].trim();
    } else if (line.startsWith('  g:')) {
      if (currentPOS) currentPOS.g = line.split(':')[1].trim();
    } else if (line.startsWith('  etymology:')) {
      if (currentPOS) currentPOS.etymology = line.split(':')[1].trim();
    } else if (line.startsWith('  gloss:')) {
      if (currentPOS) {
        if (!currentPOS.gloss) currentPOS.gloss = [];
        currentPOS.gloss.push(line.split(':')[1].trim());
      }
    }
  });
  if (currentPOS) attributes.push({word, ...currentPOS});

  return attributes;
});

// Convert to Danfo.js DataFrame
const df = new dfd.DataFrame(parsedEntries);

// Convert data to a JSON string
const jsonString = JSON.stringify(parsedEntries, null, 2); // `null` and `2` are for pretty-printing

// Define the file path
const filePath = 'es-en.json';

// Write the JSON string to a file
fs.writeFileSync(filePath, jsonString, 'utf-8');

console.log(`JSON data has been written to ${filePath}`);


// Function to read CSV into DataFrame
async function readCSV(filePath) {
  return dfd.readCSV(filePath);
}

// Function to read JSON into DataFrame
function readJSON(filePath) {
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return new dfd.DataFrame(jsonData);
}

// Function to update JSON with frequency from CSV
async function updateJSONWithFrequency() {
  try {
    // Read and parse CSV file into DataFrame
    const csvDF = await readCSV(csvFilePath);
    
    // Read and parse JSON file into DataFrame
    const jsonDF = readJSON(jsonFilePath);
    
    // Ensure 'word' columns in both DataFrames
    csvDF.rename({ 'word': 'word', 'frequency': 'frequency' }, { inplace: true });
    jsonDF.rename({ 'word': 'word' }, { inplace: true });

    // Merge DataFrames on 'word' column
    const mergedDF = jsonDF.merge(csvDF, { on: 'word', how: 'left' });

    // Convert the updated DataFrame to JSON
    const updatedJson = mergedDF.toJSON();

    // Write the updated JSON to a file
    fs.writeFileSync(updatedJsonFilePath, JSON.stringify(updatedJson, null, 2), 'utf-8');
    
    console.log(`Updated JSON data has been written to ${updatedJsonFilePath}`);
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

// Execute the function
updateJSONWithFrequency();