import csv
import json
import os

# File paths
json_file_path = 'LanguageLearning/LanguageData/Spanish/dict.json'
csv_file_path = 'LanguageLearning/LanguageData/Spanish/frequency.csv'

# Load the JSON data
with open(json_file_path, 'r', encoding='utf-8') as json_file:
    json_data = json.load(json_file)

# Create a dictionary for quick lookup of existing words
json_dict = {entry['word']: entry for entry in json_data}

# Read the CSV file and process each entry
with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    
    for row in csv_reader:
        original_word = row['word']
        word_list = row['usage'].split('|')
        
        for word in word_list:
            word_entry = word.split(':')[1]
            
            if word_entry in json_dict:
                # If the word is already in the JSON data, update the link
                json_dict[word_entry]['link'] = original_word
            else:
                # If the word is not in the JSON data, create a new entry
                new_entry = {
                    "word": word_entry,
                    "pos": row['pos'],
                    "meta": "",  # You can add more metadata if needed
                    "g": "",  # Gender, if applicable
                    "etymology": "",  # Etymology, if applicable
                    "gloss": [],  # Gloss, if applicable
                    "count": 0,  # Count, if applicable
                    "link": original_word
                }
                json_data.append(new_entry)

# Save the updated JSON data
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, ensure_ascii=False, indent=4)

print("Update complete.")
