import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Games from './pages/Games.jsx';
import GamesManage from './pages/GamesManage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/manage-games" element={<GamesManage />} />
      </Routes>
    </Router>
  );
}

export default App;
