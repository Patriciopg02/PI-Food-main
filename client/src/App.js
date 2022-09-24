import './App.css';
import { Route } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import NavBar from './components/NavBar/NavBar';
import Creation from './components/Form Creation/Creation';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';

function App() {
  return (
    <div className='fondoApp'>
      <div className="App">
        <Route exact path={'/'}>
          <Landing/>
        </Route>
        <Route exact path={'/home'}>
          <NavBar/>
          <Home/>
        </Route>
        <Route exact path={'/recipe/:id'}>
          <RecipeDetail/>
        </Route>
        <Route exact path={'/creation'}>
          <Creation/>
        </Route>
      </div>
    </div>
  );
}

export default App;
