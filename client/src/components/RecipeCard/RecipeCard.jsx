import {Link} from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({id,image,name,diets}) {
    return (
        <div className='card'>
            <Link to={`/recipe/${id}`}>
                <div className='nameCont'>
                    <h2 className='name'>{name}</h2>
                </div>
                <img className='image' src={image} alt='imgnotfound'/>
                <div className='diets'>
                        {diets.map(d => (
                            <span className='item'>{d}</span>
                        ))}
                </div>
            </Link>
        </div>
    )
}