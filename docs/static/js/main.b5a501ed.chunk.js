(this["webpackJsonpboc-parser"]=this["webpackJsonpboc-parser"]||[]).push([[0],{117:function(e,n,t){"use strict";function a(e){for(var n={},t=("?"===e[0]?e.substr(1):e).split("&"),a=0;a<t.length;a++){var r=t[a].split("=");n[decodeURIComponent(r[0])]=decodeURIComponent(r[1]||"")}return n}function r(e){for(var n=atob(e),t=n.length,a=new Uint8Array(t),r=0;r<t;r++)a[r]=n.charCodeAt(r);return a.buffer}t.d(n,"b",(function(){return a})),t.d(n,"a",(function(){return r}))},136:function(e,n,t){"use strict";(function(e){t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return c}));var a=t(21);function r(n){n.skip(1);var t=n.readUint(1).toNumber(),r=n.readUint(1).toNumber(),c=n.readUint(1).toNumber();n.skip(3);var i=n.readUint(8),s=n.readUint(256).toArrayLike(e,"be",32);return{ihr_disabled:t,bounceFlag:r,bouncedFlag:c,targetWallet:new a.Address(i.toNumber(),s)}}function c(e){var n=e.readUint(1).toNumber(),t=e.readUint(1).toNumber(),a=e.readUint(1).toNumber();return e.skip(3),{ihrDisabled:n,bounceFlag:t,bouncedFlag:a,destination:e.readAddress(),amount:e.readCoins()}}}).call(this,t(10).Buffer)},181:function(e,n,t){"use strict";(function(e){var a=t(114),r=t(11),c=t(57),i=t(2),s=t.n(i),l=t(12),d=t(191),o=t(182),u=t.n(o),j=(t(202),t(21),t(117)),b=t(190),x=t(183),h=t.n(x),O=t(136),f=t(7),m=new h.a,v=t(21).Cell,g="data:image/png;base64,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";var p=function(e){function n(n,t){console.log("onScanSuccess",n),e.onDone(n)}return Object(l.useEffect)((function(){new b.a("qr-reader",{fps:10,qrbox:250}).render(n)}),[]),Object(f.jsxs)("div",{children:[Object(f.jsxs)("h3",{children:[Object(f.jsx)("img",{className:"qr-logo",src:g}),"Scan QR Code"]}),Object(f.jsx)("div",{id:"qr-reader"}),Object(f.jsx)("div",{className:"qrReader"})]})},N=function(e,n,t){return Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"Source Wallet: "}),Object(f.jsx)("div",{className:"addr",children:e.wallet})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"Destination Address: "}),Object(f.jsx)("div",{className:"addr",children:e.destination})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"Amount: "}),Object(f.jsxs)("div",{className:"addr",children:[e.amount," \ud83d\udc8e"]})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"external IHRdisabled: "}),Object(f.jsx)("div",{className:"addr",children:e.externalIHRdisabled})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"external BounceFlag: "}),Object(f.jsx)("div",{className:"addr",children:e.externalBounceFlag})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"external Bounced Flag: "}),Object(f.jsx)("div",{className:"addr",children:e.externalBouncedFlag})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"internal Ihr_disabled: "}),Object(f.jsx)("div",{className:"addr",children:e.internalIHRdisabled})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"internal BounceFlag: "}),Object(f.jsx)("div",{className:"addr",children:e.internalBouncedFlag})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"internal  Bounced Flag: "}),Object(f.jsx)("div",{className:"addr",children:e.internalBounceFlag})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"title",children:"Reference bit Length: "}),Object(f.jsx)("div",{className:"addr",children:e.refLen})]}),Object(f.jsx)("br",{}),Object(f.jsx)("div",{className:"btn btn-cancel",onClick:n,children:"Clear"}),Object(f.jsx)("div",{className:"btn btn-deploy",onClick:t,children:"Deploy Boc"})]})};n.a=function(){var n={destination:"x",wallet:"",amount:-1,flags:"0x",refLen:-1,bocData:null},t=Object(l.useState)(n),i=Object(c.a)(t,2),o=i[0],b=i[1],x=Object(l.useRef)(null),h=Object(l.useState)(0),B=Object(c.a)(h,2),A=B[0],y=B[1],C=Object(l.useState)(0),k=Object(c.a)(C,2),w=k[0],E=k[1];Object(l.useEffect)((function(){var e=Object(j.b)(window.location.search);e.boc&&S(Object(j.a)(e.boc))}),[]);var F=function(){var e=Object(r.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.stopPropagation(),y(1),e.next=4,m.sendBoc(o.bocData);case 4:setTimeout((function(){y(2)}),200),setTimeout((function(){y(0)}),5e3);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),Q=Object(l.useCallback)((function(e){var n=new FileReader;n.onload=function(){var e=Object(r.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(n.target.result),S(n.target.result);case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),n.readAsArrayBuffer(x.current.files[0])}),[]);function S(n){var t=v.fromBoc(function(n){for(var t=new e(n.byteLength),a=new Uint8Array(n),r=0;r<t.length;++r)t[r]=a[r];return t}(n)),a=new Uint8Array(n),r=t[0].beginParse(),c=Object(O.a)(r),i=r.readRef(),s=Object(O.b)(i);b({wallet:c.targetWallet.toFriendly(),destination:s.destination.toFriendly(),amount:new u.a(s.amount.toString(10)).div(1e9).toFixed(2),externalIHRdisabled:c.ihr_disabled,externalBounceFlag:c.bounceFlag,externalBouncedFlag:c.bouncedFlag,internalIHRdisabled:s.ihrDisabled,internalBounceFlag:s.bounceFlag,internalBouncedFlag:s.bouncedFlag,refLen:i.bits.length,bocData:a})}var I=Object(d.a)({onDrop:function(e){var n=new FileReader;n.onload=function(){var e=Object(r.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S(n.target.result);case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),n.readAsArrayBuffer(e[0])}}),J=I.getRootProps,T=(I.isDragActive,o.wallet?N(o,(function(){b(n)}),F):Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"btn qr-btn",onClick:function(e){E(!0),e.stopPropagation()},children:[Object(f.jsx)("img",{className:"btn-2 qr-logo qr-logo-btn",src:g}),"Scan QR Code"]}),Object(f.jsx)("span",{className:"",children:" "}),Object(f.jsx)("input",{id:"file-upload",ref:x,type:"file",className:"file",onChange:Q}),Object(f.jsx)("label",{htmlFor:"file-upload",className:"btn btn-2",children:"Upload Boc File"})]})),V=1==A?"busy":"",W=null;2==A&&(W=Object(f.jsx)("div",{className:"deploy-message",children:"Boc Deployment Completed"}));var U=null;U=w?Object(f.jsx)(p,{onDone:function(e){E(!1),S(Object(j.a)(e))}}):null;var R=w||o.bocData?null:Object(f.jsx)("div",Object(a.a)({className:"drop-zone"},J()));return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("div",{className:"app-main",children:[Object(f.jsx)("h1",{children:"Boc Parser"}),Object(f.jsx)("div",{className:"img"}),Object(f.jsxs)("div",{className:V,children:[R,U,T,W]})]})})}}).call(this,t(10).Buffer)},192:function(e,n,t){"use strict";t.r(n);t(12);var a=t(180),r=t.n(a),c=(t(197),t(181)),i=t(7);r.a.render(Object(i.jsx)(c.a,{}),document.getElementById("root"))},197:function(e,n,t){},202:function(e,n,t){},203:function(e,n){},213:function(e,n){},290:function(e,n){},296:function(e,n){}},[[192,1,2]]]);
//# sourceMappingURL=main.b5a501ed.chunk.js.map