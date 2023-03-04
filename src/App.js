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
import UsersSidebar from '../src/components/usersSidebar/UsersSidebar';

function App() {
   const { user, isAuthReady } = useAuthContext();

   return (
      <div className='App'>
         {isAuthReady && (
            <BrowserRouter>
               {user && <Sidebar />}
               <div className='container'>
                  <Navbar />
                  <Switch>
                     <Route path='/' exact>
                        {!user ? <Redirect to='/login' /> : <Dashboard />}
                     </Route>
                     <Route path='/create'>{!user ? <Redirect to='/login' /> : <CreateProject />}</Route>
                     <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
                     <Route path='/signup'>{user ? <Redirect to='/' /> : <Signup />}</Route>
                     <Route path='/projects/:id'>{!user ? <Redirect to='/login' /> : <ProjectPage />}</Route>
                     <Route path='/*'>
                        <Redirect to='/' />
                     </Route>
                  </Switch>
               </div>
               {user && <UsersSidebar />}
            </BrowserRouter>
         )}
      </div>
   );
}

export default App;
