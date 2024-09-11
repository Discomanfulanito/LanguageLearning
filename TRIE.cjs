class TrieNode {
    constructor() {
        this.children = {};
        this.link = null; // This will hold the dictionary entry or null
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, link) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.link = link; // Store the link to the dictionary entry
    }

    // Method for search
    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return null; // Word not found
            }
            node = node.children[char];
        }
        return node.link; // Return the dictionary entry if it exists
    }

    // Method for prefix search
    searchPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return []; // Prefix not found
            }
            node = node.children[char];
        }
        return this.collectWords(node, prefix);
    }

    // Helper method to collect words with the given prefix
    collectWords(node, prefix) {
        const results = [];

        if (node.link) {
            results.push({ word: prefix, entry: node.link });
        }

        for (let char in node.children) {
            results.push(...this.collectWords(node.children[char], prefix + char));
        }

        return results;
    }
}
const fs = require('fs');
const path = require('path');

const dictPath = path.join('LanguageLearning', 'LanguageData', 'Spanish', 'dict.json');

// Load dictionary from a JSON file
const dictionaryData = JSON.parse(fs.readFileSync(dictPath, 'utf-8'));

const trie = new Trie();
for (const entry of dictionaryData) {
    trie.insert(entry.word, entry);
}


const prefix = 'fie';
const results = trie.searchPrefix(prefix);

if (results.length > 0) {
    console.log('Words with prefix:', results);
} else {
    console.log('No words found with this prefix');
}