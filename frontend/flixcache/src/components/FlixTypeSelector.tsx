interface FlixTypeSelectorProps {
    type: string
    setType: React.Dispatch<React.SetStateAction<string>>
}
function FlixTypeSelector(props: FlixTypeSelectorProps) {

    return (
        <>
             <div className="bg-darkbg text-center py-1 px-1.5 rounded-3xl font-medium text-3xl text-secondary">
                                <button className={'rounded-2xl px-4 me-1 ' + (props.type == "movie" ? 'bg-headerbg text-secondary' : 'hover:bg-bg hover:text-secondary')}
                                    onClick={() => {if(props.type == "tv") props.setType("movie")}}>Movies</button>
                                <button className={'rounded-2xl px-4 ' + (props.type != "movie" ? 'bg-headerbg text-secondary' : 'hover:bg-bg hover:text-secondary')}
                                    onClick={() => {if(props.type == "movie") props.setType("tv")}}>Series</button>
                            </div>
        </>
    )

}

export default FlixTypeSelector