import { routes } from './routes/index';
import { Toaster } from 'react-hot-toast';
// import { Header } from '@/components/header/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Toaster position='top-right' reverseOrder={false} />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
