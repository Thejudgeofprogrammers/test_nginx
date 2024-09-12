import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostForm from './components/post'; // Импортируйте ваш компонент
import Home from './components/home'; // Другие компоненты, например, Home

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/post" element={<PostForm />} />
      </Routes>
    </Router>
  );
};

export default App;