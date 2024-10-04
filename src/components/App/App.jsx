import React, { useState } from 'react'
import { Result } from '/src/components/Result/Result'

import './App.css'

export function App(){
    const [inputValue, setInputValue] = useState('');

    return(
        <>
            <div className="App-search">
                <img src="/assets/search-icon.png" alt="search icon" className="App-search-icon" />
                <input 
                    type="text" 
                    value={inputValue} 
                    className="App-search-input" 
                    placeholder="Search words..." 
                    onChange={(e) => setInputValue(e.target.value)}/>
            </div>
            <section className='App-result-container'>
            {
               <Result inputValue = {inputValue}/>
            }
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
