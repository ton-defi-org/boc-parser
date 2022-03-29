import { useCallback, useRef } from 'react';
import BigNumber from "bignumber.js";
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
                    let destAddress = cellRef.readAddress().toFriendly();  // destation address
                    let amount = cellRef.readCoins().toString(10)   // amount
                    document.getElementById('flags').textContent = flags;
                    document.getElementById('dest').textContent = destAddress;
                    document.getElementById('amount').textContent = new BigNumber(amount).dividedBy('1e9').toFormat(4);
                }
        fr.readAsArrayBuffer(file.current.files[0]);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <input ref={file} type="file" onChange={onFileChange}></input>
                    <p>Flags: <pre id="flags"></pre></p>
                    <p>Destation address: <pre id="dest"></pre></p>
                    <p>Amount: <pre id="amount"></pre></p>
                </div>
                
            </header>
        </div>
    );
}

export default App;
