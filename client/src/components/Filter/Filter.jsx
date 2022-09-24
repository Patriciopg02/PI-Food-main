import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Filter_recipes, getRecipes } from "../../store/actions";
import './Filter.css';


export default function Filter() {

    let dispatch = useDispatch();
    let diets_types = useSelector(state => state.diets);
    let offset = useSelector(state => state.offset);
    const [filter, setFilter] = useState(false);

    function onSelect(e) {
        setFilter(true);
        dispatch(Filter_recipes(e.target.value))
    }
    
    function onDelete() {
        setFilter(false);
        dispatch(getRecipes(offset))
    }

    return (
        <div>
            <div className="content-select">
                <select name='diets' onChange={onSelect}>
                    <option selected disabled value='Select Diets'>Select Diets</option>
                    {
                        diets_types?.map((d, index) => {
                            return (
                            <option key={index} id={d.id} value={d.name}>{d.name}</option>
                            )
                        })
                    }
                </select>
                <i></i>
            </div>
                {
                    filter !== false && 
                    <div className='deleteFilter'>
                        <span className='selectP'>Delete filter</span>
                        <button type='button' className='btnDelet' onClick={onDelete}>X</button>
                    </div>
                }
        </div>
    )
}