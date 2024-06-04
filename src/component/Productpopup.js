import React from 'react';



function ProductPopup({  product,onClose   }) {
  // const [mode] = useState('light');
  return (
    <div className="popup">
 
 {/* <div className={mode === 'light' ? 'light-mode' : 'dark-mode'}>
    <h1>Where in the world?</h1>
 </div> */}
 <div>
 <h1>Where in the world?</h1>
 </div>
 

 <div className='popup1'>

       <div className='img'>
       <button onClick={onClose}>Back</button>
       <h1>Where in the world?</h1>
             
       <img src={product.flags.png} alt={product.name}/>
       </div>
       <div className='heading'>
       <h2>{product.name}</h2>
       <p>Population: {product.population} </p>
     <p>Region: {product.region}</p> 
     <p>subregion: {product.subregion}</p>  
   <p>capital: {product.capital}</p> 
     <p>topLevelDomain: {product.topleveldomain}</p> 
       <p>currencies: {product.name.currencies}</p>
       </div>
   
     
    <div className='others'>
    <p>languages: {product.name.languages}</p>  
      <p>nativeName: {product.nativeName}</p> 
     <p>borders: {product.borders}</p>  
    </div>
    </div>
    </div>
  );
}

export default ProductPopup;
