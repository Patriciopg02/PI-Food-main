import { useDispatch } from "react-redux"
import {Order_recipes} from '../../store/actions'
export const ASCENDENTE = 'ASCENDENTE';
export const DESCENDENTE = 'DESCENDENTE';
export const HEALTH_SCORE = 'HEALTH_SCORE';
export const RANDOM = 'RANDOM';

export default function Order() {

    let dispatch = useDispatch();

    function onSelect(e) {
        // console.log(e.target.innerText)
        // e.preventDefault()
        dispatch(Order_recipes(e.target.value))
    }

    return (
            <div className="content-select">
                <select name='select' onChange={onSelect}>
                    <option selected value={RANDOM}>Default</option>
                    <option value={ASCENDENTE}>A-Z</option>
                    <option value={DESCENDENTE}>Z-A</option>
                    <option value={HEALTH_SCORE}>Health Score ++</option>
                </select>
                <i></i>
            </div>
    )
}