import { ASCENDENTE, HEALTH_SCORE, RANDOM } from "../../components/Order/Order";
import { CHANGE_PAGE, FILTER, GET_RECIPES, GET_RECIPES_DB, GET_DIETS, ORDER, SEARCH_RECIPES } from "../actions-type";

const initialState = {
    recipes: [],
    filtered_recipes: [],
    diets: [],
    offset: 0,
    filter: false
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filtered_recipes: action.payload
            }
        case GET_RECIPES_DB:
            let myrecipes = action.payload.filter(r => typeof(r.id) === 'string' );
            return {
                ...state,
                filtered_recipes: myrecipes,
                filter:true
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        case SEARCH_RECIPES:
            return {
                ...state,
                filtered_recipes: action.payload
            }
        case ORDER:
            var Ordered_recipes=[...state.filtered_recipes];
            console.log(action.payload);
            if (action.payload === RANDOM) {
                return {
                    ...state,
                    filtered_recipes: state.recipes
                }
            }
            if (action.payload === HEALTH_SCORE) {
                Ordered_recipes = Ordered_recipes.sort((a,b) => {
                    if(a.health_score < b.health_score) {
                        return -1;
                    }
                })
            }
            else {
                Ordered_recipes = Ordered_recipes.sort((a,b) => {
                    if (a.name < b.name) {
                        return action.payload === ASCENDENTE ? -1 : 1
                    }
                    if (a.name > b.name) {
                        return action.payload === ASCENDENTE ? 1 : -1
                    }

                    return 0;
                })
            }
            return {
                ...state,
                filtered_recipes: Ordered_recipes
            }

        case FILTER:
            let filtered_bydiet = [];
            // console.log(action.payload);
            if (action.payload.length !== 0) {
                for (let i = 0; i < state.recipes.length; i++) {
                    let found = state.recipes[i].diets.includes(action.payload);
                    if(found === true) {
                        filtered_bydiet.push(state.recipes[i])
                    }
                }
                return {
                    ...state,
                    filtered_recipes: filtered_bydiet,
                    filter:true
                }
            }
            return {
                ...state,
                filtered_recipes: state.recipes
            }

        case CHANGE_PAGE:
            return {
                ...state,
                offset: action.payload
            }


        default: 
            return state;
    }

}