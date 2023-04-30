import React from 'react';
import './App.css';
import Autocomplete from './Autocomplete';

function App() {
  const loadProducts = async (string: string) => {
    const fetchResult = await fetch(`https://dummyjson.com/products/search?q=${string}`);
    const { products } = await fetchResult.json();
    return products.map(({ title }: { title: string }) => title);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Autocomplete placeholder='Enter text...' className="App-autocomplete" loadOptions={loadProducts} />
      </header>
    </div>
  );
}

export default App;
