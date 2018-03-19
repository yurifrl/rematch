!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.RematchLoading={})}(this,function(e){"use strict";var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var n,o,r=(function(e,n){var o=t&&t.__assign||Object.assign||function(e){for(var t,n=1,o=arguments.length;o>n;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},r=t&&t.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function a(e){try{s(o.next(e))}catch(e){i(e)}}function l(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(a,l)}s((o=o.apply(e,t||[])).next())})},i=t&&t.__generator||function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=o[2&i[0]?"return":i[0]?"throw":"next"])&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[0,r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(r=(r=a.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&r[3]>i[1])){a.label=i[1];break}if(6===i[0]&&r[1]>a.label){a.label=r[1],r=i;break}if(r&&r[2]>a.label){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};Object.defineProperty(n,"__esModule",{value:!0});var a={global:0,models:{},effects:{}},l=function(e,t){return function(n,r){var i,l,s,f=r.name,c=r.action;return a.global+=t,a.models[f]+=t,a.effects[f][c]+=t,o({},n,{global:e(a.global),models:o({},n.models,(i={},i[f]=e(a.models[f]),i)),effects:o({},n.effects,(l={},l[f]=o({},n.effects[f],(s={},s[c]=e(a.effects[f][c]),s)),l))})}};n.default=function(e){void 0===e&&(e={}),function(e){if(e.name&&"string"!=typeof e.name)throw Error("loading plugin config name must be a string");if(e.asNumber&&"boolean"!=typeof e.asNumber)throw Error("loading plugin config asNumber must be a boolean");if(e.whitelist&&!Array.isArray(e.whitelist))throw Error("loading plugin config whitelist must be an array of strings");if(e.blacklist&&!Array.isArray(e.blacklist))throw Error("loading plugin config blacklist must be an array of strings");if(e.whitelist&&e.blacklist)throw Error("loading plugin config cannot have both a whitelist & a blacklist")}(e);var t=e.name||"loading",n=!0===e.asNumber?function(e){return e}:function(e){return e>0},s={name:t,reducers:{hide:l(n,-1),show:l(n,1)},state:o({},a)};return a.global=0,s.state.global=n(a.global),{config:{models:{loading:s}},init:function(o){var l=o.dispatch;return{onModel:function(o){var f=this,c=o.name;c!==t&&(a.models[c]=0,s.state.models[c]=n(a.models[c]),s.state.effects[c]={},Object.keys(l[c]).forEach(function(t){if(!0===l[c][t].isEffect){a.effects[c][t]=0,s.state.effects[c][t]=n(a.effects[c][t]);var o=c+"/"+t;if((!e.whitelist||e.whitelist.includes(o))&&(!e.blacklist||!e.blacklist.includes(o))){var u=l[c][t];l[c][t]=function(){for(var e=[],n=0;arguments.length>n;n++)e[n]=arguments[n];return r(f,void 0,void 0,function(){return i(this,function(n){switch(n.label){case 0:return n.trys.push([0,,2,3]),l.loading.show({name:c,action:t}),[4,u.apply(void 0,e)];case 1:return n.sent(),[3,3];case 2:return l.loading.hide({name:c,action:t}),[7];case 3:return[2]}})})}}}}))}}}}}}(n={exports:{}},n.exports),n.exports),i=(o=r)&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o;e.default=i,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=rematch-loading.umd.js.map
