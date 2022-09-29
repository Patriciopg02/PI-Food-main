import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetail.css';
import { Link } from 'react-router-dom';

export default function RecipeDetail() {
    const [Detail, setDetail] = useState(null);
    const {id} = useParams(); 


    //Traigo los datos de la receta con un pedido al backend.
    useEffect(() => {
        axios.get(`http://localhost:3001/api/recipes/${id}`)
        .then((response) => {
            // console.log(response.data);

            //El detalle se almacena en un estado local.
            setDetail(response.data)
        })
    }, [id])
    console.log(Detail);

    //Renderiza receta de la DB;
    if(Detail !== null && typeof Detail.id === 'string' ) {
        return(

            //Div que otorga imagen de fondo.
            <div className='fondoDetail'>

                {/* Div contenedor */}
                <div className='DetailContainer'>

                    {/* Boton Back */}
                    <Link to={'/home'}>
                        <span>Back</span>
                    </Link>

                    {/* Informacion Parte Superior */}
                    <div className='SuperiorContainer'>
                        <div className='SuperiorData'>

                            {/* Name */}
                            <h2>{Detail.name}</h2>

                            {/* ID */}
                            <span id='id'>ID: {Detail.id}</span>

                            {/* Diets */}
                            <div className='dietDetail'>
                                <h3>Diet Types:</h3>
                                <div className='diettypes'>
                                    {Detail.diets.map(d => (
                                        <span className='itemdiet' key={d}>◉ {d}   </span>
                                        ))}
                                </div>
                            </div>

                            {/* HealthScore */}
                            <div className='healthDetail'>
                                <h3>Health Score:</h3>
                                <span className='itemHS'>♥ {Detail.health_score}</span>
                            </div>
                        </div>

                        {/* Imagen */}
                        <img src={Detail.image} alt='imageUnknown'/>
                    </div>

                    {/* Informacion Parte Inferior */}
                    <div className='InferiorContainer'>

                        {/* Summary */}
                        <h3>Summary:</h3>
                        <p>{Detail.summary.replace(/<[^>]+>/g, '')}</p>

                        {/* Instructions */}
                        <h3>Instructions:</h3>
                        <div className='stepbystep'>
                            {Detail.instructions.map(s => (
                                <div className='itemStep'><span key={s.number} id='stepnumber'>Step {s.number}</span><br/><span>{s.step}</span></div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //Renderiza receta de la API
    else if(Detail !== null && typeof Detail.id !== 'string' ) {
        return(
            //Div que otorga imagen de fondo.
            <div className='fondoDetail'>

                {/* Div contenedor */}
                <div className='DetailContainer'>

                    {/* Boton Back */}
                    <Link to={'/home'}>
                        <span>Back</span>
                    </Link>

                    {/* Informacion Parte Superior */}
                    <div className='SuperiorContainer'>
                        <div className='SuperiorData'>

                            {/* Name */}
                            <h2>{Detail.name}</h2>

                            {/* ID */}
                            <span id='id'>ID: {Detail.id}</span>

                            {/* Dishes */}
                            <div className='dishDetail'>
                                <h3>Dish Types:</h3>
                                <div className='dishtypes'>
                                    {Detail.dish_types.map(d => (
                                        <span className='itemdish' key={d}>◉ {d}</span>
                                        ))}
                                </div>
                            </div>

                            {/* Diets */}
                            <div className='dietDetail'>
                                <h3>Diet Types:</h3>
                                <div className='diettypes'>
                                    {Detail.diets.map(d => (
                                        <span className='itemdiet' key={d}>◉ {d}   </span>
                                        ))}
                                </div>
                            </div>

                            {/* HealthScore */}
                            <div className='healthDetail'>
                                <h3>Health Score:</h3>
                                <span className='itemHS'>♥ {Detail.health_score}</span>
                            </div>
                        </div>

                        {/* Imagen */}
                        <img src={Detail.image} alt='imageUnknown'/>
                    </div>

                    {/* Informacion Parte Inferior */}
                    <div className='InferiorContainer'>

                        {/* Summary */}
                        <h3>Summary:</h3>
                        <p>{Detail.summary.replace(/<[^>]+>/g, '')}</p>

                        {/* Instructions */}
                        <h3>Instructions:</h3>
                        <div className='stepbystep'>
                            {Detail.instructions.map(s => (
                                <div className='itemStep'><span key={s.number} id='stepnumber'>Step {s.number}</span><br/><span>{s.step}</span></div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
        <div className='voidList'>
            <h3>Loading...</h3>
        </div>
        )
    }
}