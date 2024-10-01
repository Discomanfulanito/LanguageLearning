import './ArrowButton.css'

export function ArrowButton({goBack, show})
{
    const classname = `arrowButton${show ? '-show' : ''}`
    return(
        <button className={classname} onClick={goBack}>
            <span className="arrow"></span>
        </button>
    )
}
