import { useEffect, useState } from "react";

export const useResults = (trie, inputValue) => {
    const [results, setResults] = useState([]);

    const refreshResults = () => {        
        if (!inputValue || !trie)   {
            setResults([])
            return
        }
            
        const searchResults = trie.searchPrefix(inputValue, 10);
        if (searchResults.length > 0)
        {   
            const newResults = searchResults.map(new_result => ({
                word: new_result.entry.word,
                description: new_result.entry.gloss[0] ? new_result.entry.gloss[0] : 'No description for the moment'
            }))
            setResults(newResults)
        } else {
            setResults([{
                word: 'No results found',
                description: ''
            }])}
    };
    
    useEffect(refreshResults, [inputValue, trie])
    return { results, refreshResults}
}