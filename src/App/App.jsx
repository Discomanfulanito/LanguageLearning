import './App.css'
import { Result } from '../Result/Result.jsx'
import React, { useState } from 'react'

// Diccionario temporal para pruebas,
    // luego tu usarás la base de datos me imagino
const diccionario = [
    {
        original: "Alga",
        translation: "Seaweed",
        description: "Idk, some crazy shit"
    },
    {
        original: "Botón",
        translation: "Button",
        description: "Idk, some crazy shit"
    }
]


export function App(){
    // 
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);

    // función para cargar resultados al dar al enter
    const load = (event) => {
        if(event.key==='Enter')
        {
            
            event.preventDefault();
            const newresults = []

            // AQUÍ IRIA TU FUNCIÓN PARA FILTRAR LAS PALABRAS
                // debes hacer un push a newresults, el diccionario que he creado es temporal,
                // tu ya verás como lo haces xd, si haces una call a otro programa o como pero la idea es esa
                // pushearla a newresults con el formato {original, translation, description}
            diccionario.forEach(word => {
                if (word.original === inputValue)
                {
                    newresults.push(word)
                }
            })
            // -------------------------------------------------------------------------------------------------

            setResults(newresults)
        }
    };

    return(
        <>
            <div className="App-search">
                <img src="/assets/search-icon.png" alt="search icon" className="App-search-icon" />
                <input type="text" value={inputValue} className="App-search-input" placeholder="Search words..." onKeyDown={load} onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <section className='App-result-container'>
                {results.map((result, index) => (
                    <Result 
                        key={index}
                        original = {result.original}
                        translation={result.translation}
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
                    <a href='https://www.youtube.com/watch?v=cofqLIrLkko' target='_blank'>
                        <img src="/assets/cards-icon.svg" alt="flashcards icon" className='App-options-icon cards-icon' href='https://www.youtube.com/watch?v=cofqLIrLkko'/>
                    </a>
                    <a href='https://www.youtube.com/watch?v=cofqLIrLkko' target='_blank'>
                        <span className='App-options-text' href='https://www.youtube.com/watch?v=cofqLIrLkko'>flashcards</span>
                    </a>                
                </div>
            </div>
        </>
    )
}
