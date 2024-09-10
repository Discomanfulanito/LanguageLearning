import React, { useState } from 'react';
import Result from './Result'; // Importa tu componente Result

const App = () => {

  const load = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const result = inputValue
    }
  };

  return (
    <div className="app-container">
      <input
        type="text"
        value={inputValue}
        onKeyDown={load}
        placeholder="Escribe algo y presiona Enter"
      />

      <section className="app-result-container">
        {results.map((result, index) => (
          <Result key={index} value={result} />
        ))}
      </section>
    </div>
  );
};

export default App;
