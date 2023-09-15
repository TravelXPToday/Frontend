import './App.css';
import Traveller from './Components/UserList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Traveller </h1>
      </header>
      <div>
        <button class="Danger" onClick={Traveller()}></button>
      </div>
      <div>
        <ul>
          <li>
            <div><Traveller/></div>
          </li>
          </ul>
      </div>
    </div>

   
  );
}


export default App;
