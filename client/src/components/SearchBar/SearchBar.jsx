import { useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { getRecipes, SearchRecipes } from "../../store/actions";
import './SearchBar.css'

export default function SearchBar() {
    const [Search, setSearch] = useState('');
    let dispatch = useDispatch();
    let offset = useSelector(state => state.offset);


    function onSubmit(e) {
        e.preventDefault();
        //Al poner la busqueda en vacio vuelve a la lista principal.
        if(Search === '') {
            dispatch(getRecipes(offset))
        }
        //Sino muestra los resultados
        dispatch(SearchRecipes(Search))
    }

    function onChange(e) {
        e.preventDefault();
        setSearch(e.target.value)
    }

    return (
        <div className="box">
            <form onSubmit={onSubmit} className='searchbar' >
                <input className="input1" type='text' onChange={onChange} value={Search}/>
                <input className="input2" type='submit' value='Search'/>
            </form>     
        </div>
    )
}