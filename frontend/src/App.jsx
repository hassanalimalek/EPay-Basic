import { routes } from './routes/index';
// import { Toaster } from 'react-hot-toast';
// import { Header } from '@/components/header/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  console.log(
    'import.meta.env.API_BASE_URL --',
    import.meta.env.VITE_API_BASE_URL
  );
  console.log('import.meta.env.VITE_GPT_API --', import.meta.env.VITE_GPT_API);
  return (
    <div>
      <Router>
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
