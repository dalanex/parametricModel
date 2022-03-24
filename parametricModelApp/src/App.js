import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PARAMETRIC MODEL OF A CABLE BOX</p>
        <div className="formDiv">
         <form>
           <label className="labels">WIDTH: </label>
           <input className="inputs" type="text" id="inputWidth"/> mm<br/>
           <label className="labels">HEIGHT: </label>
           <input className="inputs" type="text" id="inputHeight"/> mm<br/>
           <label className="labels">DEPTH: </label>
           <input className="inputs" type="text" id="inputDepth"/> mm<br/>
           <label className="labels">LEVELS: </label>
           <input className="inputs" type="text" id="inputLevels"/> mm<br/>
           <button className="submit" onClick= {function() {
             var width = document.getElementById('inputWidth').value;
             var height = document.getElementById('inputHeight').value;
             var depth = document.getElementById('inputDepth').value;
             var levels = document.getElementById('inputLevels').value;
             
             //alert("Width: " + width + "\nHeight: " + height + "\nDepth: " + depth + "\nLevels: " + levels);
             
             var numbers = /^[-+]?[0-9]+$/;
             if(width.match(numbers) && height.match(numbers) && depth.match(numbers) && levels.match(numbers))
             {
                //solo numeros enteros
             } else { alert("Please, introduce only numbers and without comma"); }
           }}>Submit</button>
          </form>
        </div>
      </header>
      <div>
        <header>
          <p>AQUI VA EL STL</p>
        </header>
      </div>
    </div>
  );
}

export default App;
