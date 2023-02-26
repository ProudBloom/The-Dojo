import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

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
import Sidebar from './components/sidebar/Sidebar';
import { AuthContextComponent } from './context/AuthContext';

function App() {
   const { user, isAuthReady } = useAuthContext();

   return (
      <div className='App'>
         {isAuthReady && (
            <BrowserRouter>
               <Sidebar />
               <div className='container'>
                  <Navbar />
                  <Switch>
                     <Route path='/' exact>
                        <Dashboard />
                     </Route>
                     <Route path='/create'>
                        <CreateProject />
                     </Route>
                     <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
                     <Route path='/signup'>{user ? <Redirect to='/' /> : <Signup />}</Route>
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
         )}
      </div>
   );
}

export default App;
