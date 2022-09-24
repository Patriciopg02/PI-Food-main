import { useState } from "react";
import { useDispatch} from 'react-redux';
import { SearchRecipes } from "../../store/actions";
import './SearchBar.css'

export default function SearchBar() {
    const [Search, setSearch] = useState('');
    let dispatch = useDispatch();


    function onSubmit(e) {
        e.preventDefault(); 
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