import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CreateRecipe, getDiets } from "../../store/actions";
import { useHistory } from 'react-router-dom';
import NavbarCreation from "./NavbarCreation";
import './Creation.css'

const formValidations = (input) => {
    const errors = {}
    //Errores en el name
    if (!input.name) errors.name = 'You must complete with a name';
    else if(/^\s+$/.test(input.name)) errors.name = 'The name cannot be a blank space';  //No haya espacios en blanco
    else if(!/^[a-zA-Z]{4,20}$/.test(input.name)) errors.name= 'The name must only contain letters (4-20)'; //Solo letras desde 4 a 20 caracteres.

    //Errores en el summary
    if (!input.summary) errors.summary = 'You must complete with a summary';
    else if(/^\s+$/.test(input.summary)) errors.summary = 'The summary cannot be a blank space';

    //Errores en el healthscore
    if (!input.health_score) errors.health_score = 'You must complete with a healthy score';
    else if(/^\s+$/.test(input.health_score)) errors.health_score = 'The health score cannot be a blank space';
    else if(!(/^[1-9][0-9]?$|^100$/.test(input.health_score))) errors.health_score = 'The health score should only vary between 1-100'

    //Errores en el imagelink
    if (!input.image) errors.image = 'You must complete with a image link';

    //Errores en las diets
    if (input.diets.length === 0) errors.diets = 'You must complete with a diet';  //No sea vacio

    //Errores en los steps
    if(input.steps.length === 0) errors.steps = 'You must complete with instructions';  //No sea vacio

    return errors;
}

export default function Creation() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])
    const dietsDB = useSelector((state) => state.diets);
    // console.log(dietsDB);

    const [Errors,setErrors] = useState({})
    const [Form, setForm] = useState({
        name:'',
        image:'',
        diets:[],
        steps:[],
        summary:'',
        health_score:''
    });
    

    //Diets ---------------------------
    function onSelect(e) {
        let newdiet= dietsDB.find(d => d.name == e.target.value);
        if (!Form.diets.find(d => d.name == newdiet.name)) {
            if (Form.diets.length < 4) {
                setForm({
                    ...Form,
                    diets: [...Form.diets, newdiet]
                })
            }
        }
    }

    const onDelete = (e) => {
        setForm({
          ...Form,
          diets: Form.diets.filter((d) => d.name !== e.name)
        })
    }
    // --------------------------------

    //Submit
    const onSubmit = (e) => {
        e.preventDefault();
        //Seteo errores si se submitea sin datos
        setErrors(
            formValidations({
            ...Form,
            [e.target.name]: e.target.value
          })
        );
        if (!Form.name && !Form.summary && !Form.image && !Form.diets.length && !Form.steps.length) return alert('No ingreso ningun dato');
        
        // Ultimo guardado de la propiedad steps.
        let finishSteps = Form.steps.filter(s => s.hasOwnProperty('number'));
        console.log(finishSteps);
        setForm({
            ...Form,
            steps: finishSteps
        })

        //Todo correcto, se envian los datos!
        if (Object.keys(Errors).length === 0) {
          dispatch(CreateRecipe(Form));
          alert('Creando receta...');
          setForm({
            name:'',
            image:'',
            diets:[],
            steps:[],
            summary:'',
            health_score:''
          })
          history.push('/home');
        } else {
          alert('Completar todos los campos')
        }
        return
      }

    //Change
    function onChange(e) {
        e.preventDefault();
        setForm({
            ...Form,
            [e.target.name] : e.target.value
        })
        console.log(Form);

        setErrors(
            formValidations({
              ...Form,
              [e.target.name]: e.target.value
            })
          )
        // console.log(Form);
    }

    // ---------- Steps ----------
    let OptionsNumber = [1,2,3,4,5,6,7,8,9,10];

    const [nsteps, setNsteps] = useState([]);
    // const [Step, setStep] = useState({number:0,step:''});


    //Añadir inputs
    function numberSteps(e) {
        let num = e.target.value;
        let Numsteps = [];
        let StepsInformation = [];
        for (let i = 1; i <= num; i++){
            Numsteps.push(i);
            StepsInformation.push({number:i,step:''})
        }
        setNsteps([...Numsteps]);
        // console.log('StepsInformation')
        // console.log(StepsInformation);
        if (Form.steps.length !== 0) {
            for (let i = 1; i < StepsInformation.length; i++) {
                StepsInformation[(i)-1].step = Form.steps[(i)-1].step;
            }
        }
        setForm({
            ...Form,
            steps: StepsInformation
        })
        console.log('FormSteps');
        console.log(Form.steps);
    }


    //Añadir a la propiedad step
    function addingStep(e) {
        let step = Form.steps.find(s => (s.number == e.target.id));
        let stepsCopy = Form.steps;
        stepsCopy[(step.number)-1].step = e.target.value;
        // console.log(stepsCopy);
        setForm({
            ...Form,
            steps: stepsCopy
        })
        console.log(Form.steps);
    }
    
    if(dietsDB.length > 0) {
        // console.log(diets);

        return (
                <div className="creation">
                    <div className="Navbar">
                        <NavbarCreation/>   
                    </div>

                    <div className="all_forms">

                        <div className="Formu">

                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form_input">
                                    <h2>Name</h2>
                                    <input name="name" pattern="[A-Za-z]{1,15}" type='text'onChange={onChange} value={Form.name}/>

                                    {/* Control de errores */}
                                    {Errors.name && <h4 className='error'>{Errors.name}</h4>}
                                </div>

                                <div className="form_input">
                                    <h2>Image link</h2>
                                    <input placeholder='URL...'name="image" type='url' onChange={onChange} value={Form.image}/>

                                    {/* Control de errores */}
                                    {Errors.image && <h4 className='error'>{Errors.image}</h4>}
                                </div>

                                <div className="form_input">
                                    <h2>Summary:</h2>
                                    <input name="summary" type='text' onChange={onChange} value={Form.summary}/>

                                    {/* Control de errores */}
                                    {Errors.summary && <h4 className='error'>{Errors.summary}</h4>}
                                </div>

                                {/*------- Dietas -------*/}

                                <div className="form_input">
                                    <h2>Diet Types</h2>
                                    <div className="content-select">
                                        <select name='diets' onChange={onSelect}>
                                            <option selected value='Select Diets'>Select Diets (max 4)</option>
                                            {
                                                dietsDB?.map((d, index) => {
                                                    return (
                                                    <option key={index} id={d.id} value={d.name}>{d.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <i></i>

                                        {/* Control de errores */}
                                        {Errors.diets && <h4 className='error'>{Errors.diets}</h4>}

                                    </div>
                                </div>

                                <div className="form_input">
                                    <h2>Instructions:</h2>
                                    <h3>Steps:</h3>
                                    <div className="content-select">
                                        <select onChange={numberSteps}>
                                            <option selected disabled value='Number of steps'>Number of steps</option>
                                            {
                                                OptionsNumber.map(n => (
                                                    <option key={n} value={n}>{n} steps</option>
                                                ))
                                            }
                                        </select>
                                        <i></i>

                                        {/* Control de errores */}
                                        {Errors.steps && <h4 className='error'>{Errors.steps}</h4>}
                                    </div> 
                                </div>

                                <div className="form_input">
                                    <h2>Health Score:</h2>
                                    <input name="health_score" type='number' min='1' max='100' onChange={onChange} placeholder='0 - 100' value={Form.health_score}/>
                                    
                                    {/* Control de errores */}
                                    {Errors.health_score && <h4 className='error'>{Errors.health_score}</h4>}
                                </div>
                                
                                <input className="inputsubmit" type='submit' value='Create'/>
                            </form>
                        </div>
                        <div className="Formu">
                            <h2>Diets Selected:</h2>
                            <div className="addedDiets">
                                {/*-- Dietas agregadas --*/}
                                {
                                    Form.diets.map((d) => (
                                        <div className='dietAdd'>
                                            <p className='selectP'>{d.name}</p>
                                            <button type='button' className='btnDelet' onClick={() => { onDelete(d)}}>X</button>
                                        </div>
                                    ))
                                }
                                {/* ------------------- */}
                            </div>
                            <br/>
                            <h2>Steps:</h2>
                            {
                                nsteps !== [] && nsteps.map(n => (
                                    <div className="form_input">
                                        <label>Step Nº {n} <input type='text' className="inputSteps" id={n} onChange={addingStep}/></label>
                                        <br/>
                                    </div>
                                ))
                            }
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