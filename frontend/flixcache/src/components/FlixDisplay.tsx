import { PlusIcon } from "@heroicons/react/24/outline"
import { EyeIcon, BookmarkIcon } from "@heroicons/react/24/solid"
interface FlixDisplayProps {
    type: string
    title: string
    secure_base_url: string
    backdrop_path: string
    backdrop_size: string
    id: string
    updateModal: any
}

function FlixDisplay(props: FlixDisplayProps) {

    return (
        <>
            <div className="group text-center cursor-pointer relative" style={{ width: props.backdrop_size+'px' }}
                onClick={() => props.updateModal({open: true, mediaId: props.id, mediaType: props.type})}>
                <img className="flex-none rounded-t-lg group-hover:opacity-50" src={props.secure_base_url + 'w' + props.backdrop_size + props.backdrop_path}></img>
                <div className="absolute top-0 right-0 hidden group-hover:flex gap-1">
                    <button onClick={(e) => {e.stopPropagation(); console.log("test")}}><EyeIcon className="h-9 w-9 fill-secbright hover:fill-white"/></button>
                    <button onClick={(e) => {e.stopPropagation(); console.log("test")}}><BookmarkIcon className="h-8 w-8 fill-secbright hover:fill-white"/></button>
                    <button onClick={(e) => {e.stopPropagation(); console.log("test")}}><PlusIcon className="h-10 w-10 stroke-secbright hover:stroke-white stroke-2"/></button>
                </div>
                <div className="text-center text-bg bg-primary font-medium rounded-b-lg py-2 group-hover:opacity-75"><span className="line-clamp-1">{props.title}</span></div>
            </div>
        </>
    )
}

 export default FlixDisplay