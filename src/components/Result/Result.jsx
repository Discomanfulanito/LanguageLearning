import './Result.css'
import {useEffect, useState} from 'react'
import {useResults} from '/src/hooks/useResults.js'
import {useTrie} from '/src/hooks/useTrie.js'


const Res = ({index, word, description, handleClick, isSelected}) =>
{
        const classname = `search-result${isSelected ? '-selected' : ''}`
        const arrowClassname = `arrowButton${isSelected ? ' show' : ''}`
    
        const onResultClick = (event) => {
            if (!isSelected) handleClick(event, index)
        }
    
        return(
            <div className={classname} onClick={onResultClick}>
                <section>
                    <h1 className='search-result-word'>{word}</h1>
                </section>
                <aside>
                    <span className="search-result-description">{description}</span>
                </aside>
                <button className={arrowClassname} onClick={handleClick}>
                    <span className="arrow"></span>
                </button>
            </div>
        )
}

export function Result({inputValue})
{
    const { trie } = useTrie()
    const { results, refreshResults } = useResults(trie, inputValue)
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(refreshResults, [inputValue])

    const handleClick = (index, selectedResult) =>
    {   
        selectedResult !== null ? goBack() : showSelectedResult(index)
    }

    const showSelectedResult = (index)=> {
        setSelectedResult(index)
    }

    const goBack = () =>{
        setSelectedResult(null)
    }   
    
    return results.map((result, index) => (selectedResult === null ? 
        
        <Res 
            key={index}
            word = {result.word}
            description={result.description}
            index = {index}
            handleClick = {() => handleClick(index, selectedResult)}
        />
       : <Res  
            word = {w[selectedResult].word}
            description={w[selectedResult].description}
            handleClick = {()=>handleClick(selectedResult)}
            isSelected = {true}
        />
    ))
}
