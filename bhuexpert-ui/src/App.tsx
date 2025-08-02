import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertyList from './pages/PropertyList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyList />} />
      </Routes>
    </Router>
  );
};

export default App;
