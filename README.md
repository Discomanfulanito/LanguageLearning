# **Language Learning Project Overview**

## **Core Features:**
- **Difficulty Calculator:** Assesses the difficulty of texts and subbed video/audio materials.
- **Word Lookup Tool:** Provides dictionary definitions with root-word recognition.
- **Dynamic SRS (Spaced Repetition System):** Adapts to user interactions, similar to Anki.
- **Core Vocabulary Extractor:** Highlights important and specialized vocabulary from texts.
- **Chrome/YouTube/Netflix Integration:** Allows users to interact with learning materials seamlessly.
- **(Optional) Kanji/Hanzi Tracker:** Tracks progress for users studying Japanese or Chinese characters.

## **Word States and Progression**
The app revolves around three primary states for words:

- **Unseen:** The user has never encountered the word before.
- **Seen:** The user has encountered the word but not interacted with it. Seen words are assumed to be known unless proven otherwise.
- **Learning:** Words that the user is actively learning. These words may be highlighted in texts, appear in the SRS, and influence text difficulty calculations.

### **Familiarity Score**
Each word has an estimated familiarity score:

- **Unseen Words:** Start with a score of 0.
- **Seen Words:** Given a perfect score (e.g., 1).
- **Learning Words:** Have a score between 0 and 1, based on factors like lookup frequency or recognition without lookup.

This familiarity score affects:

- **SRS:** Determines how often a word appears for review.
- **Text Difficulty:** Helps rank the complexity of texts based on familiarity with the words.
- **Text Difficulty Calculation**

For unseen words, difficulty is assessed by considering:
- **Overall Frequency:** How often the word appears in the language. This feature helps users select materials slightly above their current level.

### **Word Lookup Feature**
When users click on a word, a pop-up provides:
- The dictionary definition of its root word (e.g., comíamos → comer; сказал → сказать).
- The option to mark the word as learning.

### **Core Vocabulary Extractor**
This tool analyzes the text and identifies words based on:
- **Overall Infrequency:** Uncommon words are scored higher.
- **In-Text Frequency:** Common words for that particular text, excluding basic words, are highlighted. The result is a list of specialized vocabulary that can aid in effective learning and later acquisition.

### **Spaced Repetition System (SRS)**
The SRS works like any standard SRS but with enhancements:
- **Context-Based Learning:** Encountering a learning word in a text impacts your knowledge of that word, especially if you don’t look it up.

### **Advanced Features**
- **LLM Integration for Sentence-Based Review:**
  - The app can use an **LLM (Large Language Model)** to generate sentences containing learning words.
  - Sentences are calibrated based on estimated difficulty, with easier sentences appearing more frequently.
  - Difficult sentences are shown less often to ensure that the user can grasp the context and better understand the word.
- **(Optional) AI-Generated Audio:**
  - The app could use generative AI to read sentences or words, though this is not essential.
- **(Optional) Vocabulary Domains:**
  - The app can estimate the user’s knowledge of domain-specific vocabulary (e.g., medicine) to guide study focus.
  - This feature becomes more useful at intermediate and advanced levels.
  - It works by comparing the user’s vocabulary knowledge with extracted core vocabularies from domain-specific texts, such as medical articles.

## **Beta Launch Languages (Order of Implementation)**
- **Spanish**
- **Japanese**
- **German**

For now, compatibility will be reserved for **English-Language** and **Language-English**. Compatibility between two non-English languages will not be supported at launch.

Languages are implemented by extracting their frequency, root words, and translations from Wiktionary. Further languages will be implemented later, and we are planning to give future support to:
- **Russian**
- **Mandarin**
- **Portuguese**
- **French**
- **Italian**
- **Catalan**
- **Korean**
