import { useCallback, useRef, useState } from 'react';
import { useDropzone } from "react-dropzone";
import BigNumber from "bignumber.js";
import './App.css';
import { Address } from 'ton';

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
    const [boc, setBoc] = useState({
        address: 'x',
        amount: -1,
        flags:'0x'
    })
    const file = useRef(null);


    

    const onFileChange = useCallback((event) => {
                let fr = new FileReader();
                fr.onload = async function (e) {
                    loadBoc(e.target.result);
                }
            fr.readAsArrayBuffer(file.current.files[0]);
    }, []);

    function loadBoc(file) {
        const myCell = Cell.fromBoc(array_buffer_to_buffer(file));
        const slice = myCell[0].beginParse();
        let flgs = slice.readUint(7);  // flags
        // const any =  slice.readUint(2);
        const wc =  slice.readUint(8);
        const addr =  slice.readUint(256);
        let hash = addr.toArrayLike(Buffer, 'be', 32);
        let x = new Address(wc.toNumber(), hash);
        console.log('wallet address', x.toFriendly());
        
        const cellRef = slice.readRef();
        const flags = cellRef.readUint(6);  // flags
        let address = cellRef.readAddress();  // destation address
        let amount = cellRef.readCoins()   // amount
        
        //document.getElementById('output').textContent = result;
        
        setBoc({
            originWallet: x.toFriendly(),
            flags: flags.toString(16),
            address: address.toFriendly(),
            amount: new BigNumber(amount.toString(10)).div(1e9).toFixed(2)
        });
    }

    function onDrop(files) {
        let fr = new FileReader();
        fr.onload = async function (e) {
            loadBoc(e.target.result);
        }
        fr.readAsArrayBuffer(files[0]);
    }

    const { getRootProps, isDragActive } = useDropzone({onDrop});
      const bocData = boc.amount > 0 ? (
      <ul className='flex-cntnr'>  
        <li><div className='field-name'>Source Wallet: </div>
        <div className='field-value'>{boc.originWallet}</div></li>
        <li><div className='field-name'>Destination Address: </div>
        <div className='field-value'>{boc.address}</div></li>
        <li><div className='field-name'>Amount: </div>
        <div className='field-value'>{boc.amount}</div></li>
        <li><div className='field-name'>Flags: </div>
        <div className='field-value'>{boc.flags}</div></li>
    </ul>) : (<div>
    <span className=''> Drag Boc here</span> 
    <input ref={file} type="file" onChange={onFileChange}></input>    
    </div>);
//  
    return (
        <div className="App">
            <div className="app-main"  {...getRootProps()}>
                <div>
                    {bocData    }
                </div>
                <p>
                    
                </p>
            </div>
            
        </div>
    );
}

export default App;
