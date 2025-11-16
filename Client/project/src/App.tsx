import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Women from './pages/Women';
import Men from './pages/Men';
import Kids from './pages/Kids';
import Genz from './pages/Genz';
import Brands from './pages/Brands';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/genz" element={<Genz />} />
        <Route path="/collections" element={<Brands />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
