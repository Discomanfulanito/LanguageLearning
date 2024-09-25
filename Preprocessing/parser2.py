import json
import math

# Path to the input JSON file
file_path = 'LanguageLearning/public/LanguageData/Spanish/dict.json'

def calculate_frequency(count):
    return math.log(count + 1)

def process_json_file(path):
    # Read the JSON file
    with open(path, 'r', encoding='utf-8') as infile:
        data = json.load(infile)
    
    # Ensure data is a list of entries
    if not isinstance(data, list):
        raise ValueError("The JSON file must contain a list of entries.")
    
    # Process each entry to replace 'count' with 'frequency'
    for entry in data:
        if 'count' in entry:
            entry['frequency'] = calculate_frequency(entry['count'])
            del entry['count']  # Remove the 'count' field
        else:
            raise KeyError("Each entry must have a 'count' field.")
    
    # Write the updated data back to the same file
    with open(path, 'w', encoding='utf-8') as outfile:
        json.dump(data, outfile, indent=4, ensure_ascii=False)

# Run the script
process_json_file(file_path)
