import DetailsModal from "../features/modal/DetailsModal"
import FlixSearch from "../features/search/FlixSearch"
import { useAppSelector } from "../reduxHooks"

function MediaSearchPage() {
    const open: boolean = useAppSelector((state) => state.detailsModal.open)
    return (
        <>
            <FlixSearch/>
            {open && <DetailsModal/>}
        </>
    )
}

export default MediaSearchPage