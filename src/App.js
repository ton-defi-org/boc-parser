import logo from './logo.svg';
import './App.css';
global.Buffer = require("buffer/").Buffer

const Address = require("ton").Address
const Cell = require("ton").Cell

const address = new Address(0, new Buffer("EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP"))
const cell = new Cell();
cell.bits.writeUint(0, 32);
cell.bits.writeAddress(address);
const result = cell.toString()

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    {result}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
