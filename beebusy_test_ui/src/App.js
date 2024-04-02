import './App.css';
import {Home} from './Home';
import {User} from './Users';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
      Beesbusy
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/">
              Accueil
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/utilisateurs">
              Utilisateurs
            </NavLink>
          </li>
        
        </ul>
      </nav>

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Utilisateurs" element={<User />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
