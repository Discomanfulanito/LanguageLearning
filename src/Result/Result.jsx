import './Result.css'

export function Result({original, translation, description})
{
    return(
        <div className="search-result-entry">
            <section className="search-result-entry-translate">
                <h1 className="search-result-original">{original}</h1>
            </section>
            <aside>
                <span className="search-result-entry-description">{description}</span>
            </aside>
        </div>
    )
}