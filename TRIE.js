import fs from "fs/promises";

class TrieNode {
    constructor() {
        this.children = {};
        this.link = null;
        this.originalWords = [];
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Helper method to normalize words (make them case-insensitive and accent-insensitive)
    normalize(word) {
        return word
            .toLowerCase() // Convert to lowercase
            .normalize('NFD') // Decompose accents
            .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
    }

    insert(word, link) {
        let normalizedWord = this.normalize(word); // Normalize the word
        let node = this.root;
        for (let char of normalizedWord) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }

        // Instead of overwriting, store both the normalized and original word
        if (!node.link) {
            node.link = link; // Store the dictionary link or entry
            node.originalWords = []; // Store the original words
        }

        node.originalWords.push(word); // Add the original word to the node
    }

    // Method for search
    search(word) {
        let normalizedWord = this.normalize(word); // Normalize the word
        let node = this.root;
        for (let char of normalizedWord) {
            if (!node.children[char]) {
                return null; // Word not found
            }
            node = node.children[char];
        }
        if (node.originalWords && node.originalWords.length > 0) {
            for (let entry of node.originalWords) {
                if (entry.word === word) { // Compare the original word
                    return { link: entry }; // Return the exact match
                }
            }
        }

        return node.link ? { link: node.link } : null; // Return both the dictionary entry and original words
    }

    // Method for prefix search
    searchPrefix(prefix, cap) {
        let normalizedPrefix = this.normalize(prefix); // Normalize the prefix
        let node = this.root;
        for (let char of normalizedPrefix) {
            if (!node.children[char]) {
                return []; // Prefix not found
            }
            node = node.children[char];
        }
        return this.collectWords(node, normalizedPrefix, cap);
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
                // For each original word stored, return the dictionary entry
                node.originalWords.forEach(originalWord => {
                    results.push({ word: originalWord, entry: node.link });
                });
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

    // Método para construir el diccionario
    async buildDict(_path)
    {
        try {
            // Leer el archivo JSON
            const data = await fetch(_path);
            const dictionary = await data.json();

            // Insertar cada entrada del diccionario en el Trie
            for (const entry of dictionary) {
                this.insert(entry.word, entry);
            }
            console.log('Dictionary loaded and Trie updated.');
        } catch (error) {
            console.error('Error loading dictionary:', error);
        }
    }
}

function parseText(trie, text) {
    const results = [];
    let i = 0;

    // Keep the original text intact for exact matches
    const originalText = text;

    // Normalize the entire text before parsing
    text = text
        .toLowerCase() // Convert to lowercase
        .normalize('NFD') // Decompose accents
        .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks

    while (i < text.length) {
        let node = trie.root;
        let lastMatch = null;
        let lastMatchIndex = -1;
        let matchedOriginalEntry = null;

        // Try to match as long a word as possible using the Trie
        for (let j = i; j < text.length; j++) {
            const char = text[j];

            // Check if the current character is in the Trie node
            if (!node.children[char]) {
                break; // No more matches
            }

            node = node.children[char];

            // If the node has a dictionary entry, remember this as a valid match
            if (node.link) {
                lastMatch = node.link; // Store the dictionary entry as the last valid match
                lastMatchIndex = j;

                // Check the original word array for an exact match
                for (let originalWord of node.originalWords) {
                    if (originalWord.toLowerCase() === originalText.slice(i, j + 1).toLowerCase()) {
                        matchedOriginalEntry = node.link; // Store the exact dictionary entry if found
                        break;
                    }
                }
            }
        }

        // If a valid match was found, add the dictionary entry to the results
        if (lastMatch) {
            if (matchedOriginalEntry) {
                results.push(matchedOriginalEntry); // Push the exact matched dictionary entry if found
            } else {
                results.push(lastMatch); // Otherwise, push the last valid dictionary entry
            }
            i = lastMatchIndex + 1; // Skip ahead to the end of the matched word
        } else {
            i++; // If no valid word was found, move to the next character
        }
    }

    return results;
}

export default Trie;