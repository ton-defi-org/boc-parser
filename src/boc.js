import { Address, Cell } from 'ton';

export function readExternalMessage(cell) {
    
}


export function readExternalMessageD(slice) {
    slice.skip(1); //tag
    const ihr_disabled = slice.readUint(1).toNumber();
    const bounceFlag = slice.readUint(1).toNumber();
    const bouncedFlag = slice.readUint(1).toNumber();
    slice.skip(3); //anycast address


    // const any =  slice.readUint(2);
    const wc =  slice.readUint(8);
    const addr =  slice.readUint(256);
    
    let hash = addr.toArrayLike(Buffer, 'be', 32);
    let targetWallet = new Address(wc.toNumber(), hash);
    return {
        ihr_disabled,
        bounceFlag,
        bouncedFlag,
        targetWallet
    }
}


export function readInternalMessageD(slice) {
    
    const ihrDisabled = slice.readUint(1).toNumber();
    const bounceFlag = slice.readUint(1).toNumber();
    const bouncedFlag = slice.readUint(1).toNumber();
    slice.skip(3); //anycast address
    const destination = slice.readAddress().toFriendly();  // destnation address
    const amount = slice.readCoins();   // amount
    return {
        ihrDisabled,
        bounceFlag,
        bouncedFlag,
        destination,
        amount
    }
}

//tonwhales 
export function readInternalMessage(slice) {
    
    slice.skip(1);
    const ihrDisabled = slice.readUint();
    const bounce = slice.readUint();
    const bounced = slice.readUint();
    const from = slice.readAddress();
    const to = slice.readAddress();
    const value = slice.writeCoins();
    slice.skip(1);
    const ihrFees = slice.writeCoins();
    const fwdFees = slice.writeCoins();
    
    return {
        ihrDisabled,
        bounce,
        bounced,
        from,
        to,
        value,
        
    }
}
