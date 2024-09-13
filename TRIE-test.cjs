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
        return this.collectWords(node, prefix, null);
    }

    searchPrefix(prefix, cap) {
        let i = 0;
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return []; // Prefix not found
            }
            node = node.children[char];
        }
        return this.collectWords(node, prefix, cap);
    }

    // Helper method to collect words with the given prefix and cap
    collectWords(node, prefix, cap) {
        const results = [];
        if (!cap) cap = Infinity;

        // Helper function to recursively collect words
        const collectRecursive = (node, currentPrefix) => {
            // Stop collecting if we've reached the cap
            if (results.length >= cap) return;

            if (node.link) {
                // If word is unique (no declinations, etc), add and skip steps
                if (node.link.link == 0){ results.push({ word: currentPrefix, entry: node.link }); return;}
                // Else add the root word in case it's not already added
                else {
                    const exists = results.some(item => item.word === node.link.link);
                    if (!exists){
                        if (node.link.link != currentPrefix)
                            results.push({ word: node.link.link, entry: this.search(node.link.link) });
                        else results.push({ word: currentPrefix, entry: node.link }); }
                }
            }

            for (let char in node.children) {
                if (results.length >= cap) return;
                collectRecursive(node.children[char], currentPrefix + char);
            }
        };

        // Start collecting from the given node
        collectRecursive(node, prefix);

        return results;
    }
}
const fs = require('fs');
const path = require('path');

const dictPath = path.join('LanguageLearning', 'public', 'LanguageData', 'Spanish', 'dict.json');

// Load dictionary from a JSON file
const dictionaryData = JSON.parse(fs.readFileSync(dictPath, 'utf-8'));

const trie = new Trie();
for (const entry of dictionaryData) {
    trie.insert(entry.word, entry);
}
    
console.log(trie.searchPrefix("en", 100));