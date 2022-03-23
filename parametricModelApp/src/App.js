import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PARAMETRIC MODEL OF A CABLE BOX</p>
        <div className="formDiv">
         <form>
           <label className="labels">WIDTH: </label>
           <input className="inputs" type="text"/> mm<br/>
           <label className="labels">HEIGHT: </label>
           <input className="inputs" type="text"/> mm<br/>
           <label className="labels">DEPTH: </label>
           <input className="inputs" type="text"/> mm<br/>
           <label className="labels">LEVELS: </label>
           <input className="inputs" type="text"/> mm<br/>
           <button className="submit" onClick= {function() { console.log("SUBMIT"); }}>Submit</button>
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
