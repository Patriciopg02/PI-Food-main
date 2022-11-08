import {GET_RECIPES, GET_RECIPES_DB, SEARCH_RECIPES,ORDER,FILTER,CHANGE_PAGE,GET_DIETS} from '../actions-type';
import axios from 'axios';

export function getRecipes(offset) {
    return function(dispatch) {
        axios.get(`${process.env.BACK_HOST}/api/recipes?offset=${offset}`)
        .then((recipes) => {
            dispatch({
                type: GET_RECIPES,
                payload: recipes.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function getDiets() {
    return function(dispatch) {
        axios.get(`${process.env.BACK_HOST}/api/diets/`)
        .then((diets) => {
            dispatch({
                type: GET_DIETS,
                payload: diets.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function getRecipesDB() {
    return function(dispatch) {
        axios.get(`${process.env.BACK_HOST}/api/recipes?offset=0`)
        .then((recipes) => {
            dispatch({
                type: GET_RECIPES_DB,
                payload: recipes.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function CreateRecipe(props) {
    return function() {
        axios.post(`${process.env.BACK_HOST}/api/recipes/`, {
        name: props.name,
        image: props.image,
        summary: props.summary,
        instructions: props.steps,
        health_score: props.health_score
        })
        .then(function (response) {
            // console.log(response);
            // console.log(response.data.id);
            if (response.data === 'Esta receta ya existe!') {
                alert('Esta receta ya existe!')
            }
            else {
                for (let i = 0; i < props.diets.length; i++) {
                    // console.log('dieta');
                    // console.log(props.diets[i].id);
                    axios.post(`${process.env.BACK_HOST}/api/recipes/${response.data.id}/diet/${props.diets[i].id}`)
                    .then(function (response) {
                        console.log('OK');
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }
        })
        .catch(err => console.log(err));
    }
}

export function SearchRecipes(search) {
    return function(dispatch) {
        axios.get(`${process.env.BACK_HOST}/api/recipes?name=${search}&offset=0`)
        .then((recipes) => {
            // console.log(recipes.data);
            dispatch({
                type: SEARCH_RECIPES,
                payload: recipes.data
            })
        })
        .catch(err => console.log(err))
    }
}

export function ChangePage(offset) {
    return {
        type: CHANGE_PAGE,
        payload: offset
    }
}

export function Order_recipes(order) {
    return {
        type: ORDER,
        payload: order
    }
}

export function Filter_recipes(elem) {
    return {
        type: FILTER,
        payload: elem
    } 
}