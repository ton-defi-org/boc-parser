import { useCallback, useRef, useState } from 'react';
import { useDropzone } from "react-dropzone";
import BigNumber from "bignumber.js";
import './App.css';
import { Address } from 'ton';

import TonWeb from "tonweb";
const tonweb = new TonWeb();

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
    const initialBoc = {
        destination: 'x',
        wallet: '',
        amount: -1,
        flags:'0x',
        refLen: -1,
        bocData: null
    };

    const [boc, setBoc] = useState(initialBoc);
    const file = useRef(null);

    const [deploying, setDeploying] = useState(0);

    var onDeploy = async (e) => {
        e.stopPropagation();  
        setDeploying(1);
        await tonweb.sendBoc(boc.bocData);
        
        setTimeout( ()=> { setDeploying(2)}, 200);
        setTimeout( ()=> { setDeploying(0)}, 5000);
    }

    

    const onFileChange = useCallback((event) => {
                let fr = new FileReader();
                fr.onload = async function (e) {
                    loadBoc(e.target.result);
                }
            fr.readAsArrayBuffer(file.current.files[0]);
    }, []);

    function loadBoc(file) {
        const myCell = Cell.fromBoc(array_buffer_to_buffer(file));
        const bocU8 = new Uint8Array(file);
        const slice = myCell[0].beginParse();
        let flgs = slice.readUint(7);  // flags
        // const any =  slice.readUint(2);
        const wc =  slice.readUint(8);
        const addr =  slice.readUint(256);
        let hash = addr.toArrayLike(Buffer, 'be', 32);
        let originWallet = new Address(wc.toNumber(), hash);
        let flags = 0;
        let destination = '0x';
        let amount = 0;

        const cellRef = slice.readRef();
        flags = cellRef.readUint(6).toString(16);  // flags

        
        try {

            destination = cellRef.readAddress().toFriendly();  // destation address
            amount = cellRef.readCoins();   // amount
        } catch(e) {

        } finally {   
            setBoc({
                wallet: originWallet.toFriendly(),
                destination: destination,
                amount: new BigNumber(amount.toString(10)).div(1e9).toFixed(2),
                refLen: cellRef.bits.length,
                flags: flags,
                bocData: bocU8
            });
        }
    
    }

    function onDrop(files) {
        let fr = new FileReader();
        fr.onload = async function (e) {
            loadBoc(e.target.result);
        }
        fr.readAsArrayBuffer(files[0]);
    }

    const { getRootProps, isDragActive } = useDropzone({onDrop});
      const bocData = boc.wallet ? BocInfo(boc, ()=> { setBoc(initialBoc); }, onDeploy)
       : (<div>
        <span className=''> </span> 
        <input id="file-upload" ref={file} type="file" className='file' onChange={onFileChange}></input>    
        <label htmlFor="file-upload" className="btn">
            <i class="fa fa-cloud-upload"></i> Custom Upload
        </label>

        </div>);    
//  
    let klass = deploying == 1 ? 'busy' : '';
    let deployDoneMessage = null;
    if(deploying == 2) {
        deployDoneMessage = <div className='deploy-message'>Boc Deployment Completed</div>
    }

    return (<div className="App">
            <div className="app-main"  {...getRootProps()}>
             <h1>Boc Parser</h1>
             <div className='img'></div>
                <div className={klass}>
                    {bocData}
                    {deployDoneMessage}
                </div>
            </div>
        </div>);
}


const BocInfo = ( boc, onClear, onDeploy ) => {
    
    return (
        <div>  
        <div><div className='title'>Source Wallet: </div>
        <div className='addr'>{boc.wallet}</div>
        </div>
        <div><div className='title'>Destination Address: </div>
        <div className='addr'>{boc.destination}</div>
        </div>
        <div><div className='title'>Amount: </div>
        <div className='addr'>{boc.amount} 💎</div>
        </div>
        <div><div className='title'>Flags: </div>
        <div className='addr'>{boc.flags}</div>
        </div>
        <div><div className='title'>Reference bit Length: </div>
        <div className='addr'>{boc.refLen}</div>
        </div>
        <br/>
        <div className='btn btn-cancel' onClick={onClear}>Clear</div>
        <div className='btn btn-deploy' onClick={onDeploy}>Deploy Boc</div>
    </div>
    )
  };

export default App;
