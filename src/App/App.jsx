import './App.css'
import { Result } from '../Result/Result.jsx'
import React, { useState, useEffect } from 'react'

import Trie from '/TRIE.js'



export function App(){
    // Initialize States 
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const [trie, setTrie] = useState(null);
  
    
    useEffect(() => {
        const initializeTrie = async () => {
            const newtrie = new Trie();
            const dictPath = '/LanguageData/Spanish/dict.json'

            await newtrie.buildDict(dictPath);
            setTrie(newtrie);
        }
        initializeTrie();
    }, []);

    // función para cargar resultados al dar al enter
    const load = (event) => {

        let newResults = []
        if (inputValue === ''){
            setResults([])
        } else if (event.key ==='Enter' || event.key === 'CapsLock')
        {
            event.preventDefault()
            console.log('prevented %s',event.key)
        }
        else if(trie && inputValue !== ''){
            const searchResults = trie.searchPrefix(inputValue);
            if (searchResults.length != 0)
            {
                searchResults.forEach((new_result) =>
                {
                newResults.push({
                    word: new_result.entry.word,
                    description: new_result.entry.gloss[0] ? new_result.entry.gloss[0] : 'No description for the moment'
                    })
                })
            
            setResults(newResults)
            }
            else{
                setResults([
                    {
                        word: 'No results found',
                        description: '',
                    }
                ])
            }
        }
 
    };

    return(
        <>
            <div className="App-search">
                <img src="/assets/search-icon.png" alt="search icon" className="App-search-icon" />
                <input type="text" value={inputValue} className="App-search-input" placeholder="Search words..." onKeyUp={load} onChange={(e) => setInputValue(e.target.value)}/>
            </div>
            <section className='App-result-container'>
                {results.map((result, index) => (
                    <Result 
                        key={index}
                        word = {result.word}
                        description={result.description}
                    />
                ))}

            </section>
            
            <div className="App-options-container">
                <div className='App-option'>
                    <img src="/assets/core-icon.svg" alt="core vocab icon" className='App-options-icon core-icon'/>
                    <span className='App-options-text'>core vocab</span>
                </div>
                <div className='App-option'>
                    <img src="/assets/velocimeter-icon.svg" alt="difficulty level calculator icon" className='App-options-icon velocimeter-icon'/>
                    <span className='App-options-text'>difficulty</span>
                </div>
                <div className='App-option'>
                    <a href='' target='_blank'>
                        <img src="/assets/cards-icon.svg" alt="flashcards icon" className='App-options-icon cards-icon' href='https://www.youtube.com/watch?v=cofqLIrLkko'/>
                    </a>
                    <a href='' target='_blank'>
                        <span className='App-options-text' href=''>flashcards</span>
                    </a>                
                </div>
            </div>
        </>
    )
}
