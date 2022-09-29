import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDiets, getRecipes} from '../../store/actions';
import RecipeCard from '../RecipeCard/RecipeCard'
import './RecipesList.css';

export default function RecipesList() {
    const recipes = useSelector((state) => state.filtered_recipes);
    let offset = useSelector((state) => state.offset);
    let filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    console.log(recipes);

    useEffect(() => {
        dispatch(getRecipes(offset));
        dispatch(getDiets());
    }, [offset])
    

    //Muestra mensaje de 'Recetas no encontradas' por el estado filter
    if(recipes.length === 0 && filter === true) {
        return (
            <div className='voidList'>
                <h3>No se encontraron recetas :(</h3>
            </div>
        )
    }

    //Muestra mensaje de 'Loading'
    else if(recipes.length === 0) {
        return (
            <div className='voidList'>
                <h3>Loading...</h3>
            </div>
        )
    }
    else {
        //Una vez cargadas, muestra la lista principal de recetas
        return (
            <div className='list'>
                {
                    recipes.map((recipe) => {
                        return <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} image={recipe.image} diets={recipe.diets}/>
                    })
                }
            </div>
        )
    }
}