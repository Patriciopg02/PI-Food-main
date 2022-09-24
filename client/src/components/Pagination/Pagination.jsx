import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ChangePage } from "../../store/actions";
import './Pagination.css';

export default function Pagination() {

    let offset = useSelector((state) => state.offset)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    function changePage(e) {
        if (e.target.value === 'Back' && offset > 8) {
            setPage(page - 1)
            offset = offset - 9;
        }
        if (e.target.value === 'Next') {
            offset = offset + 9;
            setPage(page + 1)
        }
        dispatch(ChangePage(offset))
    }

    return (
        <div className="pagination">
            <button type="button" value="Back" onClick={changePage}>Back</button>
            <h4>Page: {page}</h4>
            <button type="button" value="Next" onClick={changePage}>Next</button>
        </div>
    )
}