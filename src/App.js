import { useCallback, useRef, useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import BigNumber from "bignumber.js";
import './App.css';
import { Address } from 'ton';
import { parseQuery, base64ToArrayBuffer } from './utils'
import  { Html5QrcodeScanner } from 'html5-qrcode'
import TonWeb from "tonweb";
import {readInternalMessage, readExternalMessageD, readInternalMessageD} from "./boc";

const tonweb = new TonWeb();
const Cell = require("ton").Cell;
const qr_image = 'data:image/png;base64,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';

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

    /** State */
    const [boc, setBoc] = useState(initialBoc);
    const file = useRef(null);
    const [deploying, setDeploying] = useState(0);
    const [readingQR, setReadingQrMode] = useState(0);
    useEffect( ()=> {
        let params = parseQuery(window.location.search);
        if(params.boc) {
            let u8Arr = base64ToArrayBuffer(params.boc);
            loadBoc(u8Arr);
        }
    }, []);

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
                    console.log(e.target.result);
                    loadBoc(e.target.result);
                }
            fr.readAsArrayBuffer(file.current.files[0]);
    }, []);

    function loadBoc(file) {
        const myCell = Cell.fromBoc(array_buffer_to_buffer(file));
        const bocU8 = new Uint8Array(file);
        const slice = myCell[0].beginParse();
        
        let externalMsg = readExternalMessageD(slice)
        
        const inMsgCell = slice.readRef();
        let inMsg = { amount: new BigNumber(0), ihrDisabled: '', bounceFlag :'', bouncedFlag: '', destination: '-'};
        try {
            inMsg = readInternalMessageD(inMsgCell);
        } catch(e) {}

        setBoc({
            wallet: externalMsg.targetWallet.toFriendly(),
            destination: inMsg.destination,
            amount: new BigNumber(inMsg.amount.toString(10)).div(1e9).toFixed(2),
            'externalIHRdisabled': externalMsg.ihr_disabled,
            'externalBounceFlag': externalMsg.bounceFlag,
            'externalBouncedFlag': externalMsg.bouncedFlag,
            'internalIHRdisabled': inMsg.ihrDisabled,
            'internalBounceFlag': inMsg.bounceFlag,
            'internalBouncedFlag': inMsg.bouncedFlag,
            'refLen': inMsgCell.bits.length,
            bocData: bocU8
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
      const bocData = boc.wallet ?  BocInfo(boc, ()=> { setBoc(initialBoc); }, onDeploy) : 
        (<div>
            <div className='btn qr-btn' onClick={(e)=> { setReadingQrMode(true); e.stopPropagation();  }}>
                 <img className='btn-2 qr-logo qr-logo-btn' src={qr_image}></img>Scan QR Code
            </div>
            <span className=''> </span> 
            <input id="file-upload" ref={file} type="file" className='file' onChange={onFileChange}></input>    
            <label htmlFor="file-upload" className="btn btn-2">
                Upload Boc File
            </label>
        </div>);    
//  
    let klass = deploying == 1 ? 'busy' : '';
    let deployDoneMessage = null;
    if(deploying == 2) {
        deployDoneMessage = <div className='deploy-message'>Boc Deployment Completed</div>
    }

    let qrReader = null;
    if(readingQR) {
        qrReader = (<QrReader onDone={onQrRead} />)
     //   dropArea = null;
    } else {
        qrReader = null;
    }

    function onQrRead(data) {
        setReadingQrMode(false);
        let u8Arr = base64ToArrayBuffer(data);
        loadBoc(u8Arr);
    }   

    const dropArea = readingQR || boc.bocData ? null : (<div className='drop-zone' {...getRootProps()}></div>)

    return (<div className="App">
            <div className="app-main"  >
             <h1>Boc Parser</h1> 
             <div className='img'></div>
                <div className={klass}>
                    {dropArea}
                    {qrReader}
                    {bocData}
                    {deployDoneMessage}
                </div>
            </div>
        </div>);
}

const QrReader = ( props ) => {
    function onScanSuccess(decodedText, decodedResult) {
        console.log('onScanSuccess',decodedText)
        props.onDone(decodedText)
    }

    useEffect(() => {
        var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess);
          
      }, []);
        
    return (
        <div>
            <h3><img className='qr-logo' src={qr_image}></img>Scan QR Code</h3>
            <div id="qr-reader" ></div>
            <div className='qrReader'></div>
        </div>)
            
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
        <div><div className='title'>Transfer Amount: </div>
        <div className='addr'>{boc.amount} TON 💎</div>
        </div>
        <div><div className='title'>External Flags: </div>
        <div className='addr'>IHR-Disabled {boc.externalIHRdisabled}</div>
        <div className='addr'>Bounce {boc.externalBounceFlag}</div>
        <div className='addr'>Bounced {boc.externalBouncedFlag}</div>
        </div>
        <div><div className='title'>Internal Flags: </div>
        <div className='addr'>IHR-Disabled {boc.internalIHRdisabled}</div>
        <div className='addr'>Bounce {boc.internalBounceFlag}</div>
        <div className='addr'>Bounced {boc.internalBouncedFlag}</div>
        </div>
        <div><div className='title'>Reference bit Length: </div>
        <div className='addr'>{boc.refLen}</div>
        </div>
        <br/>
        <div className='btn btn-cancel' onClick={onClear}>Clear</div>
        <div className='btn btn-deploy' onClick={onDeploy}>Send Boc to Mainnet</div>
    </div>
    )
  };

export default App;
