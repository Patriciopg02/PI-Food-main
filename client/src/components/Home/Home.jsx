import RecipesList from '../RecipesList/RecipesList';
import Pagination from '../Pagination/Pagination';
import './Home.css';

export default function Home() {
    return(
        <div className='home'>
            <RecipesList/>
            <br/>
            <Pagination/>
        </div>
    )
}