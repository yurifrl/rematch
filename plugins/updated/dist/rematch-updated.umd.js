!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.RematchUpdated={})}(this,function(e){"use strict";var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var n,o,r=(function(e,n){var o=t&&t.__assign||Object.assign||function(e){for(var t,n=1,o=arguments.length;o>n;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},r=t&&t.__awaiter||function(e,t,n,o){return new(n||(n=Promise))(function(r,a){function i(e){try{c(o.next(e))}catch(e){a(e)}}function u(e){try{c(o.throw(e))}catch(e){a(e)}}function c(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(i,u)}c((o=o.apply(e,t||[])).next())})},a=t&&t.__generator||function(e,t){var n,o,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=o[2&a[0]?"return":a[0]?"throw":"next"])&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[0,r.value]),a[0]){case 0:case 1:r=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,o=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(r=(r=i.trys).length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&r[3]>a[1])){i.label=a[1];break}if(6===a[0]&&r[1]>i.label){i.label=r[1],r=a;break}if(r&&r[2]>i.label){i.label=r[2],i.ops.push(a);break}r[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){void 0===e&&(e={});var t=e.name||"updated",n={name:t,reducers:{onUpdate:function(e,t){return o({},e,((n={})[t.name]=o({},e[t.name],((r={})[t.action]=new Date,r)),n));var n,r}},state:{}};return{config:{models:{updated:n}},init:function(e){var o=e.dispatch;return{onModel:function(e){var i=this,u=e.name;if(![t,"loading"].includes(u)){var c=o[u];n.state[u]={},Object.keys(c).forEach(function(e){if(o[u][e].isEffect){var n=o[u][e];o[u][e]=function(c){return r(i,void 0,void 0,function(){return a(this,function(r){switch(r.label){case 0:return[4,n(c)];case 1:return r.sent(),o[t].onUpdate({name:u,action:e}),[2]}})})}}})}}}}}}}(n={exports:{}},n.exports),n.exports),a=(o=r)&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o;e.default=a,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=rematch-updated.umd.js.map