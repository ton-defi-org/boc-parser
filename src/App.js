import { useCallback, useRef } from 'react';
import './App.css';

const Cell = require("ton").Cell

function array_buffer_to_buffer(ab) {
    const buffer = new Buffer(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}

function App() {

    const file = useRef(null);

    const onFileChange = useCallback((event) => {
                let fr = new FileReader();
                fr.onload = async function (e) {
                    const myCell = Cell.fromBoc(array_buffer_to_buffer(e.target.result));
                    const slice = myCell[0].beginParse();
                    const cellRef = slice.readRef();
                    const flags = cellRef.readUint(6);  // flags
                    let address = cellRef.readAddress();  // destation address
                    let amount = cellRef.readCoins()   // amount
                    const result = flags.toString(16) + '\n' +
                    address.toFriendly() + '\n' +
                    amount.toString(10)
                    document.getElementById('output').textContent = result;
                }
        fr.readAsArrayBuffer(file.current.files[0]);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <input ref={file} type="file" onChange={onFileChange}></input>
                    <pre id="output"></pre>
                </div>
                <p>
                    
                </p>
            </header>
        </div>
    );
}

export default App;
