import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { ChangePage } from "../../store/actions";
import './Pagination.css';

export default function Pagination() {

    let offset = useSelector((state) => state.offset);
    let filter = useSelector((state) => state.filter);
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
    
    if(filter === false) {
        return (
            <div className="pagination">
                <button type="button" value="Back" onClick={changePage}>Back</button>
                <h4>Page: {page}</h4>
                <button type="button" value="Next" onClick={changePage}>Next</button>
            </div>
        )
    }
    else {
        //Se inhabilita la paginacion cuando hay un filtro aplicado. Ya que solo mostrara hasta 9 cartas unicamente.
        return (
            <div className="paginationUnhabilited">
                <button type="button" value="Back">Back</button>
                <h4>Page: 1</h4>
                <button type="button" value="Next">Next</button>
            </div>
        )
    }
}