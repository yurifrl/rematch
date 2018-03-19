"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var commonjsGlobal="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function unwrapExports(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var lib=createCommonjsModule(function(e,t){var n=commonjsGlobal&&commonjsGlobal.__assign||Object.assign||function(e){for(var t,n=1,o=arguments.length;o>n;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},o=commonjsGlobal&&commonjsGlobal.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,a){function l(e){try{s(o.next(e))}catch(e){a(e)}}function i(e){try{s(o.throw(e))}catch(e){a(e)}}function s(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(l,i)}s((o=o.apply(e,t||[])).next())})},r=commonjsGlobal&&commonjsGlobal.__generator||function(e,t){var n,o,r,a,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,o&&(r=o[2&a[0]?"return":a[0]?"throw":"next"])&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[0,r.value]),a[0]){case 0:case 1:r=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,o=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!(r=(r=l.trys).length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){l=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&r[3]>a[1])){l.label=a[1];break}if(6===a[0]&&r[1]>l.label){l.label=r[1],r=a;break}if(r&&r[2]>l.label){l.label=r[2],l.ops.push(a);break}r[2]&&l.ops.pop(),l.trys.pop();continue}a=t.call(e,l)}catch(e){a=[6,e],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}};Object.defineProperty(t,"__esModule",{value:!0});var a={global:0,models:{},effects:{}},l=function(e,t){return function(o,r){var l,i,s,c=r.name,u=r.action;return a.global+=t,a.models[c]+=t,a.effects[c][u]+=t,n({},o,{global:e(a.global),models:n({},o.models,(l={},l[c]=e(a.models[c]),l)),effects:n({},o.effects,(i={},i[c]=n({},o.effects[c],(s={},s[u]=e(a.effects[c][u]),s)),i))})}};t.default=function(e){void 0===e&&(e={}),function(e){if(e.name&&"string"!=typeof e.name)throw Error("loading plugin config name must be a string");if(e.asNumber&&"boolean"!=typeof e.asNumber)throw Error("loading plugin config asNumber must be a boolean");if(e.whitelist&&!Array.isArray(e.whitelist))throw Error("loading plugin config whitelist must be an array of strings");if(e.blacklist&&!Array.isArray(e.blacklist))throw Error("loading plugin config blacklist must be an array of strings");if(e.whitelist&&e.blacklist)throw Error("loading plugin config cannot have both a whitelist & a blacklist")}(e);var t=e.name||"loading",i=!0===e.asNumber?function(e){return e}:function(e){return e>0},s={name:t,reducers:{hide:l(i,-1),show:l(i,1)},state:n({},a)};return a.global=0,s.state.global=i(a.global),{config:{models:{loading:s}},init:function(n){var l=n.dispatch;return{onModel:function(n){var c=this,u=n.name;u!==t&&(a.models[u]=0,s.state.models[u]=i(a.models[u]),s.state.effects[u]={},Object.keys(l[u]).forEach(function(t){if(!0===l[u][t].isEffect){a.effects[u][t]=0,s.state.effects[u][t]=i(a.effects[u][t]);var n=u+"/"+t;if((!e.whitelist||e.whitelist.includes(n))&&(!e.blacklist||!e.blacklist.includes(n))){var f=l[u][t];l[u][t]=function(){for(var e=[],n=0;arguments.length>n;n++)e[n]=arguments[n];return o(c,void 0,void 0,function(){return r(this,function(n){switch(n.label){case 0:return n.trys.push([0,,2,3]),l.loading.show({name:u,action:t}),[4,f.apply(void 0,e)];case 1:return n.sent(),[3,3];case 2:return l.loading.hide({name:u,action:t}),[7];case 3:return[2]}})})}}}}))}}}}}}),index=unwrapExports(lib);exports.default=index;
//# sourceMappingURL=rematch-loading.cjs.js.map
