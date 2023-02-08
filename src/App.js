import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//styles
import './App.css';

//pages
import CreateProject from './pages/createProject/CreateProject';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import ProjectPage from './pages/projectPage/ProjectPage';
import Signup from './pages/signup/Signup';

//compoennts
import Navbar from './components/navbar/Navbar';

function App() {
   return (
      <div className='App'>
         <BrowserRouter>
            <div className='container'>
               <Navbar />
               <Switch>
                  <Route path='/' exact>
                     <Dashboard />
                  </Route>
                  <Route path='/create'>
                     <CreateProject />
                  </Route>
                  <Route path='/login'>
                     <Login />
                  </Route>
                  <Route path='/signup'>
                     <Signup />
                  </Route>
                  <Route path='/projects/:id'>
                     <ProjectPage />
                  </Route>
                  {/* Redirect */}
                  <Route path='/*'>
                     <Redirect to='/' />
                  </Route>
               </Switch>
            </div>
         </BrowserRouter>
      </div>
   );
}

export default App;
