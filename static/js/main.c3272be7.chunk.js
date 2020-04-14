(this["webpackJsonptaquito-react"]=this["webpackJsonptaquito-react"]||[]).push([[0],{111:function(e,t){},158:function(e,t,a){},172:function(e,t,a){e.exports=a(357)},177:function(e,t,a){},184:function(e,t){},186:function(e,t){},249:function(e,t){},251:function(e,t){},280:function(e,t){},281:function(e,t){},352:function(e,t,a){},353:function(e,t,a){},354:function(e,t,a){},357:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(16),i=a.n(c),o=(a(177),a(4)),l=a.n(o),u=a(11),s=a(8),d=a(29),p=a(161),m=a(380),b=a(379),h=a(44),g=(a(158),function(e){var t=Object(h.a)(),a=t.register,c=t.handleSubmit,i=Object(n.useState)(""),o=Object(s.a)(i,2),d=o[0],p=o[1],g=Object(n.useState)(!1),f=Object(s.a)(g,2),v=f[0],E=f[1],k=e.updateProvider,O=e.provider,S=e.loading,j=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.rpc&&k(t.rpc),p("Provider set and key file is importing"),E(!0);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){E(!1)};return r.a.createElement("div",{id:"rpc"},r.a.createElement("h3",null,"Provider"),d&&r.a.createElement(m.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:v,autoHideDuration:3e3,onClose:w},r.a.createElement(b.a,{elevation:6,variant:"filled",onClose:w,severity:"success"},d)),r.a.createElement("div",{id:"rpc-dialog"},r.a.createElement("div",{id:"rpc-content"},r.a.createElement("div",{id:"balance-form"},r.a.createElement("form",{onSubmit:c(j)},r.a.createElement("input",{onChange:k,value:O||"https://api.tez.ie/rpc/carthagenet",id:"rpc-input",name:"rpc",ref:a}),r.a.createElement("br",null),r.a.createElement("input",{disabled:!!S,id:"show-balance-button",type:"submit"}))))))}),f=a(69),v=(a(352),function(e){var t=e.handleNetworkChange,a=e.network,n=e.updateContractAddress,c=e.handleContractSubmit,i=e.loading,o=Object(h.a)(),l=o.register,u=o.handleSubmit,s={value:a,label:a.charAt(0).toUpperCase()+a.slice(1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"dialog"},r.a.createElement("h2",null,"Get Contract Code"),r.a.createElement(f.a,{className:"network-select",options:[{value:"mainnet",label:"Mainnet"},{value:"carthagenet",label:"Carthagenet"},{value:"sandbox",label:"Sandbox"}],value:s,onChange:function(e){t(e.value)}}),r.a.createElement("div",{id:"content"},r.a.createElement("div",{id:"contract-code-form"},r.a.createElement("form",{onSubmit:u(c)},r.a.createElement("input",{onChange:n,placeholder:"Contract Address",id:"address-input",name:"address",ref:l}),r.a.createElement("br",null),r.a.createElement("input",{disabled:!!i,id:"show-balance-button",type:"submit"}))))))}),E=(a(353),function(e){var t=e.handleNetworkChange,a=e.network,n=e.handleLaunchSubmit,c=e.updateSigner,i=e.signer,o=e.loading,l=Object(h.a)(),u=l.register,s=l.handleSubmit,d={value:a,label:a.charAt(0).toUpperCase()+a.slice(1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"dialog"},r.a.createElement("h2",null,"Launch Contract"),r.a.createElement(f.a,{name:"address",ref:u,className:"network-select",options:[{value:"mainnet",label:"Mainnet"},{value:"carthagenet",label:"Carthagenet"},{value:"sandbox",label:"Sandbox"}],value:d,onChange:function(e){t(e.value)}}),r.a.createElement("div",{id:"content"},r.a.createElement("div",{id:"contract-launch-form"},r.a.createElement("form",{onSubmit:s(n)},r.a.createElement("span",{className:"signer-toolbar"},r.a.createElement("input",{onClick:c,value:"ephemeral",id:"ephemeral",type:"radio"}),r.a.createElement("label",{className:"ephemeral"===i?"signer-button-selected":"signer-button",htmlFor:"ephemeral"},"Ephemeral Key"),r.a.createElement("input",{onClick:c,value:"tezbridge",id:"tezbridge",type:"radio"}),r.a.createElement("label",{className:"tezbridge"===i?"signer-button-selected":"signer-button",htmlFor:"tezbridge"},"TezBridge"),r.a.createElement("input",{onClick:c,value:"beacon",id:"beacon",type:"radio"}),r.a.createElement("label",{className:"beacon"===i?"signer-button-selected":"signer-button",htmlFor:"beacon"},"Beacon")),r.a.createElement("input",{disabled:!!o,id:"show-balance-button",type:"submit"}))))))}),k=function(e){var t=e.snackbar,a=e.closeSnackbar,n=e.type,c=e.children,i=e.duration;return r.a.createElement(m.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:t,autoHideDuration:"none"===i?null:5e3,onClose:a},r.a.createElement(b.a,{elevation:6,variant:"filled",onClose:a,severity:n},c))},O=function(e){var t=e.txnAddress,a=e.snackbar,n=e.closeSnackbar,c=e.error,i=e.loading,o=e.loadingMessage,l=e.launchNetwork;return r.a.createElement(r.a.Fragment,null,t&&!o&&r.a.createElement(k,{snackbar:a,closeSnackbar:n,type:"success"},r.a.createElement(r.a.Fragment,null,"Launched new contract at ",t,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://".concat(l,".tzstats.com/").concat(t)},"View on TzStats"))),c&&!o&&r.a.createElement(k,{snackbar:a,closeSnackbar:n,type:"warning"},r.a.createElement(r.a.Fragment,null,c)),i&&r.a.createElement(k,{duration:"none",snackbar:a,closeSnackbar:n,type:"info"},r.a.createElement(r.a.Fragment,null,o)))},S=(a(354),function(){return r.a.createElement("div",{className:"navbar"},r.a.createElement("div",{className:"left-container"},r.a.createElement("img",{height:"45",width:"150",alt:"Built With Taquito logo",src:"./public/taquito.png"})),r.a.createElement("div",{className:"right-container"},r.a.createElement("a",{href:"https://github.com/ecadlabs/taquito"},r.a.createElement("img",{alt:"Github logo",height:"55",width:"100",src:"./public/github.jpg"}))))}),j=a(17),w=a(164),C=a(165),x=function(){var e=Object(u.a)(l.a.mark((function e(t,a,n,r,c,i,o,u,s,p){var m,b,h,g,f;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t,e.next="ephemeral"===e.t0?3:"tezbridge"===e.t0?19:"beacon"===e.t0?22:23;break;case 3:return e.prev=3,m=new j.a,e.next=7,m.createRequest({url:"https://api.tez.ie/keys/".concat(n||a,"/ephemeral"),method:"POST",headers:{Authorization:"Bearer taquito-example"}});case 7:return b=e.sent,h=b.id,g=b.pkh,f=new w.a(g,"https://api.tez.ie/keys/".concat(n||a,"/ephemeral/").concat(h,"/"),{headers:{Authorization:"Bearer taquito-example"}}),e.next=13,d.a.setSignerProvider(f);case 13:e.next=18;break;case 15:e.prev=15,e.t1=e.catch(3),p&&p(e.t1.message);case 18:return e.abrupt("break",24);case 19:return d.a.setProvider({rpc:"https://api.tez.ie/rpc/".concat(n||a),signer:new C.a}),d.a.contract.originate({code:r,init:c}).then((function(e){return e.contract()})).then((function(e){i&&i(!1),o&&o(!1),u&&u(""),s&&s(e.address),o&&o(!0)})).catch((function(e){throw e})),e.abrupt("break",24);case 22:case 23:return e.abrupt("break",24);case 24:case"end":return e.stop()}}),e,null,[[3,15]])})));return function(t,a,n,r,c,i,o,l,u,s){return e.apply(this,arguments)}}(),y=(a(355),a(356),function(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)([]),o=Object(s.a)(i,2),m=o[0],b=o[1],h=Object(n.useState)(),f=Object(s.a)(h,2),k=f[0],j=f[1],w=Object(n.useState)("carthagenet"),C=Object(s.a)(w,2),y=C[0],z=C[1],N=Object(n.useState)("carthagenet"),F=Object(s.a)(N,2),P=F[0],L=F[1],q=Object(n.useState)(""),A=Object(s.a)(q,2),T=A[0],B=A[1],J=Object(n.useState)("ephemeral"),M=Object(s.a)(J,2),I=M[0],D=M[1],G=Object(n.useState)(!1),H=Object(s.a)(G,2),R=H[0],U=H[1],K=Object(n.useState)(""),V=Object(s.a)(K,2),W=V[0],$=V[1],_=Object(n.useState)(""),Q=Object(s.a)(_,2),X=Q[0],Y=Q[1],Z=Object(n.useState)(""),ee=Object(s.a)(Z,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(!1),re=Object(s.a)(ne,2),ce=re[0],ie=re[1],oe=Object(n.useState)(""),le=Object(s.a)(oe,2),ue=le[0],se=le[1];Object(n.useEffect)((function(){a&&localStorage.setItem("lastLaunchedContract",a);var e=localStorage.getItem("lastLaunchedContract");se(e)}),[a]);var de=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("sandbox"===t){e.next=4;break}return e.next=3,d.a.setProvider({rpc:"https://api.tez.ie/rpc/".concat(t)});case 3:Y("https://api.tez.ie/rpc/".concat(t));case 4:Y(t),z(t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),pe=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return U(!0),$("Launching contract..."),ie(!0),Y("https://api.tez.ie/rpc/".concat(y)),e.next=6,d.a.setProvider({rpc:"https://api.tez.ie/rpc/".concat(y)});case 6:return e.next=8,x(I,P,y,m,k,U,ie,$,c,ae);case 8:"tezbridge"!==I&&d.a.contract.originate({code:m,init:k}).then((function(e){return e.contract()})).then((function(e){U(!1),ie(!1),$(""),c(e.address),ie(!0)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),me=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return U(!0),$("Loading contract code..."),ie(!0),e.next=5,d.a.setProvider({rpc:X});case 5:return e.next=7,x(I,P,y);case 7:return e.next=9,d.a.contract.at(T);case 9:t=e.sent,b(t.script.code),j(t.script.storage),$(""),U(!1);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),be=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Y(t.target.value);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),he=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.currentTarget.value,D(t.currentTarget.value);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ge=m.length>0?"// Contract Code \n"+JSON.stringify(m,null,2):"// Contract Code",fe=k?"// Storage Code \n"+JSON.stringify(k,null,2):"// Storage Code ";return r.a.createElement(r.a.Fragment,null,r.a.createElement(S,null),r.a.createElement("div",{id:"top-header"},r.a.createElement(g,{loading:R,provider:X,updateProvider:be}),ue&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Last Launched Contract:",r.a.createElement("div",{id:"last-launched-contract"},r.a.createElement("h5",null,ue))))),r.a.createElement("div",{id:"wallet"},r.a.createElement("h1",null,"Taquito Contract Tool"),r.a.createElement(O,{launchNetwork:y,txnAddress:a,snackbar:ce,closeSnackbar:function(){ie(!1)},error:te,loading:R,loadingMessage:W}),r.a.createElement("div",{id:"main-forms"},r.a.createElement(v,{loading:R,handleContractSubmit:me,updateContractAddress:function(e){B(e.target.value)},handleNetworkChange:function(e){"sandbox"===e&&Y(""),Y("https://api.tez.ie/rpc/".concat(e)),L(e)},network:P}),r.a.createElement(E,{loading:R,signer:I,updateSigner:he,handleLaunchSubmit:pe,handleNetworkChange:de,network:y})),r.a.createElement("div",{id:"contract-code-editor"},r.a.createElement(p.split,{width:"1000px",height:"300px",mode:"json",theme:"monokai",tabSize:2,splits:2,style:{borderRadius:"5px",margin:"0 auto"},orientation:"beside",value:[ge,fe],name:"contract-code-editor",editorProps:{$blockScrolling:!0}}))))});i.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[172,1,2]]]);
//# sourceMappingURL=main.c3272be7.chunk.js.map