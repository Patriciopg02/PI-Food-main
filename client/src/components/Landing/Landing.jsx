import './Landing.css'
import video from '../../resources/LandingVideo.mp4';

export default function Landing(){

    return (
        <div className="landing">
            <div className='elements'>

                {/* Logo con Animacion */}
                <div className='title'>
                    <span className='flicker3'>Y</span>
                    <span>ou</span>
                    <span className='flicker2'>r</span>
                    <span> </span>
                    <span className='flicker1'>r</span>
                    <span>ec</span>
                    <span className='flicker2'>i</span>
                    <span>pe</span>
                    <span className='flicker3'>s</span>
                    <span> </span>
                    <span>ap</span>
                    <span className='flicker4'>p</span>
                </div>

                {/* Boton con animacion de ingreso */}
                <a href={`${process.env.BACK_HOST}/home`} className='ingresar'>
                    <span id='span1'></span>
                    <span id='span2'></span>
                    <span id='span3'></span>
                    <span id='span4'></span>
                    Join
                    </a>

                {/* Frase de gastronomia */}
                <div className='phrase'>
                    <span>" El descubrimiento de un nuevo plato es de más provecho para la humanidad que el descubrimiento de una estrella "</span>
                </div>

                {/* Creador de la APP */}
                <div className='creator'>
                    <span>by Patricio Pereyra Gargiulo</span>
                </div>
            </div>

            {/* Etiqueta video para el fondo */}
            <video muted autoPlay loop>
                <source src={video}
                type='video/mp4'/>
            </video>

            {/* Div 'capa' para dar efecto al video */}
            <div className='capa'></div>
        </div>
    )
}