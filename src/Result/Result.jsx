import './Result.css'

export function Result({word, description, handleClick, isSelected=false, index})
{
    return(
        <div className= {`search-result${isSelected ? '-selected' :""}`} onClick={() => handleClick(index)}>
            <section>
                <h1 className='search-result-word'>{word}</h1>
            </section>
            <aside>
                <span className="search-result-description">{description}</span>
            </aside>
        </div>
    )
}
