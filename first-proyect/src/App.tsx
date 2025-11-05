import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './contexts/CartContexts';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Router>
      <CartProvider>
        <HomePage />
      </CartProvider>
    </Router>
  );
}

export default App;
