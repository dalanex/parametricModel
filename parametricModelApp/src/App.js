import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PARAMETRIC MODEL OF CABLE BOX</p>
        <div className="formDiv">
         <form>
           <label>LONGITUD</label>
           <input type="text"/><br/>
           <label>ALTURA</label>
           <input type="text"/><br/>
           <label>PROFUNDIDAD</label>
           <input type="text"/><br/>
           <label>NIVELES</label>
           <input type="text"/><br/>
           <input type="submit" value="Submit"/>
          </form>
        </div>
      </header>
      <div>
        <header>
          <p>HOLA</p>
        </header>
      </div>
    </div>
  );
}

export default App;
