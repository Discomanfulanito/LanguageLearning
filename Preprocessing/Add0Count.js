const fs = require('fs');
const filePath = 'updated_data.json';

// Function to read the JSON file and process the data
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse the JSON data
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  // Assign count of 0 if it doesn't exist
  jsonData.forEach(entry => {
    if (!entry.hasOwnProperty('count')) {
      entry.count = 0;
    }
  });

  // Overwrite the original file with modified data
  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
    if (writeErr) {
      console.error('Error writing to file:', writeErr);
      return;
    }
    console.log(`Modified JSON data saved back to ${filePath}`);
  });
});
