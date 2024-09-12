import fs from "fs/promises";


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
        return this.collectWords(node, prefix).slice(0,10);
        
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

    // 
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

export default Trie;