import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInSignUp from './frontpage';
import Logged from './user_profile';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<SignInSignUp />} />
          <Route path='/Logged' element={<Logged/>} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
