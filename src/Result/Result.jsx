import './Result.css'

export function Result({word, description})
{
    return(
        <div className="search-result">
            <section>
                <h1 className='search-result-word'>{word}</h1>
            </section>
            <aside>
                <span className="search-result-description">{description}</span>
            </aside>
        </div>
    )
}
