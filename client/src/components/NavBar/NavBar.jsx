import SearchBar from "../SearchBar/SearchBar";
import Order from "../Order/Order";
import './NavBar.css';
import Filter from "../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipesDB } from "../../store/actions";
export default function NavBar() {

    const dispatch = useDispatch();
    let offset = useSelector(state => state.offset);

    function onClicked(e) {
        if(e.target.checked === true) {
            dispatch(getRecipesDB());
        }
        else {
            dispatch(getRecipes(offset))
        }
    }

    return (
        <div className="fondo">
            <div className="container">
                <div className='LogoTitle'>
                    <span className='flick1'>R</span>
                    <span>ec</span>
                    <span className='flick2'>i</span>
                    <span>pe</span>
                    <span className='flick3'>s</span>
                    <span> </span>
                    <span>ap</span>
                    <span className='flick4'>p</span>
                </div>
                <div className="search">
                    <SearchBar/>
                </div>
                <div className="creationButton">
                    <a href="http://localhost:3000/creation">Create</a>
                </div>
                <div className="wrap-toggle">
                    <label>My recipes</label>
                    <input type='checkbox' onClick={onClicked} id='toggle' className="offscreen"></input>
                    <label for='toggle' className="switch"></label>
                </div>
                <div className="filter">
                    <Filter/>
                </div>
                <div className="order">
                    <Order/>
                </div>
            </div>
        </div>
    )
}