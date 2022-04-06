import { Address } from 'ton';

export function readExternalMessageD(slice) {
    slice.skip(1); //tag
    const ihr_disabled = slice.readUint(1).toNumber();
    const bounceFlag = slice.readUint(1).toNumber();
    const bouncedFlag = slice.readUint(1).toNumber();
    slice.skip(3); //anycast address

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

// wallet-v3.fif
// <b b{01} s, bounce 1 i, b{000} s, dest_addr Addr, amount Gram+cc, 0 9 64 32 + + u,
//   body-cell <s 2dup 1 s-fits-with? not rot over 1 i, -rot { drop body-cell ref, } { s, } cond
// b>
export function readInternalMessageD(slice) {
    slice.skip(1); 
    const ihrDisabled = slice.readUint(1).toNumber();
    const bounceFlag = slice.readUint(1).toNumber();
    const bouncedFlag = slice.readUint(1).toNumber();
    slice.skip(2); //anycast address
    const destination = slice.readAddress().toFriendly();  // destination address
    const amount = slice.readCoins();   // amount
    return {
        ihrDisabled,
        bounceFlag,
        bouncedFlag,
        destination,
        amount
    }
}
