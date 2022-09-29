import SearchBar from "../SearchBar/SearchBar";
import Order from "../Order/Order";
import './NavBar.css';
import Filter from "../Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getRecipesDB } from "../../store/actions";
export default function NavBar() {

    const dispatch = useDispatch();
    let offset = useSelector(state => state.offset);

    //Se activa con el switch y busca las recetas de la DB.
    function onClicked(e) {
        if(e.target.checked === true) {
            dispatch(getRecipesDB());
        }
        
        //Si se desactiva el switch muestra las recetas de la pagina actual.
        else {
            dispatch(getRecipes(offset))
        }
    }

    return (
        // Div que otorga la imagen de fondo.
        <div className="fondo">
            <div className="container">

                {/* Logo Recipes con Animacion */}
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

                {/* SearchBar */}
                <div className="search">
                    <SearchBar/>
                </div>

                {/* Creation Button */}
                <div className="creationButton">
                    <a href="http://localhost:3000/creation">Create</a>
                </div>

                {/* Switch My Recipes */}
                <div className="wrap-toggle">
                    <label>My recipes</label>
                    <input type='checkbox' onClick={onClicked} id='toggle' className="offscreen"></input>
                    <label for='toggle' className="switch"></label>
                </div>

                {/* Filter */}
                <div className="filter">
                    <Filter/>
                </div>

                {/* Order */}
                <div className="order">
                    <Order/>
                </div>
            </div>
        </div>
    )
}