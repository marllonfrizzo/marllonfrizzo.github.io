import React from 'react';
import './App.css';

function App() {
  return (
    <div className="content">
      <h2>Olá</h2>
      <p>Seja bem-vindo(a) a minha página pessoal.</p>
      <p>
        <span><a href="https://www.last.fm/pt/user/marllonfrizzo">Last.fm</a> | </span>
        <span><a href="https://twitter.com/marllonfrizzo">Twitter</a> | </span>
        <span><a href="https://github.com/marllonfrizzo">GitHub</a> | </span>
        <span><a href="https://www.linkedin.com/in/marllon-f-8718b616b">LinkedIn</a></span>
      </p>
      <p className="footer">Marllon Frizzo, {new Date().getFullYear()}</p>
    </div>
  );
}

export default App;
