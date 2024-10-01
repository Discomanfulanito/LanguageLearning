import './Result.css'
import { ArrowButton } from '../ArrowButton/ArrowButton'

export function Result({word, description, handleClick, isSelected=false, index, goback, showButton=false})
{
    const classname = `search-result${isSelected ? '-selected' : ''}`
    return(
        <div className={classname} onClick={(event) => handleClick(event, index)}>
            <section>
                <h1 className='search-result-word'>{word}</h1>
            </section>
            <aside>
                <span className="search-result-description">{description}</span>
            </aside>

            <ArrowButton show={showButton} goBack={goback}/>

        </div>
    )
}
