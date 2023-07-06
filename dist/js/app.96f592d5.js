(function(){"use strict";var e={9717:function(e,t,o){var n=o(9242),r=o(3396);const l={class:"app"};function a(e,t,o,n,a,s){const u=(0,r.up)("VisualEditor");return(0,r.wg)(),(0,r.iD)("div",l,[(0,r.Wm)(u,{modelValue:n.state,"onUpdate:modelValue":t[0]||(t[0]=e=>n.state=e)},null,8,["modelValue"])])}var s=o(4870),u=JSON.parse('{"container":{"width":"550","height":"550"},"blocks":[{"top":100,"left":100,"zIndex":1,"type":"text"},{"top":200,"left":100,"zIndex":1,"type":"button"},{"top":300,"left":100,"zIndex":1,"type":"input"}]}'),c=(0,r.aZ)({props:{data:{type:Object}},setup(e){const t=(0,s.qj)(e?.data),o=(0,r.Fl)((()=>({top:`${e.data.top}px`,left:`${e.data.left}px`,zIndex:`${e.data.zIndex}`}))),n=(0,r.f3)("config"),l=(0,s.iH)(null),a=(0,s.iH)(e.data.alignCenter);return(0,r.bv)((()=>{const{offsetWidth:e,offsetHeight:o}=l.value;a.value&&(t.left-=e/2,t.top-=o/2,a.value=!1),t.width=e,t.height=o})),()=>{const t=n.componentMap[e.data.type],a=t?.render();return(0,r.Wm)("div",{class:"editor-block",style:o.value,ref:l},[a])}}}),d=o(390),i=(o(7658),o(1373));const p=(0,i.Z)();function v(e,t){let o=null;const n=e=>{e.dataTransfer.dropEffect="move"},r=e=>{e.preventDefault()},l=e=>{e.dataTransfer.dropEffect="none"},a=e=>{t.value.blocks.push({top:e.offsetY,left:e.offsetX,zIndex:1,type:o.type,alignCenter:!0})},s=(t,s)=>{o=s;const u=e.value;u.addEventListener("dragenter",n),u.addEventListener("dragover",r),u.addEventListener("dragleave",l),u.addEventListener("drop",a),p.emit("start")},u=()=>{const t=e.value;t.removeEventListener("dragenter",n),t.removeEventListener("dragover",r),t.removeEventListener("dragleave",l),t.removeEventListener("drop",a),p.emit("end")};return{dragstart:s,dragend:u}}function f(e,t){const o=(0,s.iH)(-1),n=(0,r.Fl)((()=>e.value.blocks[o.value])),l=(0,r.Fl)((()=>({selected:e.value.blocks.filter((e=>e.selected)),unselected:e.value.blocks.filter((e=>!e.selected))}))),a=(e,n,r)=>{if(t.value)return;e.preventDefault(),e.stopPropagation();const a=l.value.selected.length;e.shiftKey?n.selected=!n.selected:n.selected||(a>=1&&u(),n.selected=!0),o.value=r,i(e)},u=()=>{t.value||e.value.blocks.forEach((e=>e.selected=!1))};let c={startX:0,startY:0,dragging:!1},d=(0,s.qj)({x:null,y:null});const i=t=>{const{width:o,height:r}=n.value;c={dragging:!1,startX:t.clientX,startY:t.clientY,startLeft:n.value.left,startTop:n.value.top,startPos:l.value.selected.map((({top:e,left:t})=>({top:e,left:t}))),lines:(()=>{const{unselected:t}=l.value;let n={x:[],y:[]};return[...t,{top:0,left:0,width:e.value.container.width,height:e.value.container.height}].forEach((e=>{const{top:t,left:l,width:a,height:s}=e;n.y.push({showTop:t,top:t}),n.y.push({showTop:t,top:t-r}),n.y.push({showTop:t+s/2,top:t+s/2-r/2}),n.y.push({showTop:t+s,top:t+s}),n.y.push({showTop:t+s,top:t+s-r}),n.x.push({showLeft:l,left:l}),n.x.push({showLeft:l+a,left:l+a}),n.x.push({showLeft:l+a/2,left:l+a/2-o/2}),n.x.push({showLeft:l+a,left:l+a-o}),n.x.push({showLeft:l,left:l-o})})),n})()},document.addEventListener("mousemove",v),document.addEventListener("mouseup",f)},v=t=>{let{clientX:o,clientY:n}=t;c.dragging||(c.dragging=!0,p.emit("start"));const r=o-c.startX+c.startLeft,l=n-c.startY+c.startTop;let a=null,s=null;const u=c.lines;for(let e=0;e<u.y.length;e++){const{showTop:t,top:o}=u.y[e];if(Math.abs(o-l)<5){a=t,n=c.startY-c.startTop+o;break}}for(let e=0;e<u.x.length;e++){const{showLeft:t,left:n}=u.x[e];if(Math.abs(n-r)<5){s=t,o=c.startX-c.startLeft+n;break}}d.x=s,d.y=a;const i=o-c.startX,v=n-c.startY;e.value.blocks.filter((e=>e.selected)).forEach(((e,t)=>{e.top=c.startPos[t].top+v,e.left=c.startPos[t].left+i}))},f=e=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",f),d.x=null,d.y=null,c.dragging&&(p.emit("end"),c.dragging=!1)};return{blcokMousedown:a,clearFocus:u,markLine:d,selectedStatus:l}}function m(e,t){const o=(0,s.qj)(e),n={curr:-1,queue:[],commands:{},commandsArr:[],destroyArr:[]},l=e=>{n.commandsArr.push(e),n.commands[e.name]=(...t)=>{const{redo:o,undo:r}=e.execute(...t);if(o(),!e.pushQueue)return;let{curr:l,queue:a}=n;a.length&&(a=a.slice(0,l+1),n.queue=a),a.push({redo:o,undo:r}),n.curr=l+1}};l({name:"redo",keyboard:"ctrl+y",execute(){return{redo(){const e=n.queue[n.curr+1];e&&(e.redo&&e.redo(),n.curr++)}}}}),l({name:"undo",keyboard:"ctrl+z",execute(){return{redo(){if(-1===n.curr)return;const e=n.queue[n.curr];e&&(e.undo&&e.undo(),n.curr--)}}}}),l({name:"drag",pushQueue:!0,init(){this.before=[];const e=()=>{this.before=(0,d.Z)(o.value.blocks)},t=()=>n.commands.drag();return p.on("start",e),p.on("end",t),()=>{p.off("start"),p.off("end")}},execute(){const e=this.before,t=o.value.blocks;return{redo(){o.value={...o.value,blocks:t}},undo(){o.value.blocks=[...e]}}}}),l({name:"updateContainer",pushQueue:!0,execute(e){let t={before:o.value,after:e};return{redo:()=>{o.value=t.after},undo:()=>{o.value=t.before}}}}),l({name:"placeTop",pushQueue:!0,execute(){const e=(0,d.Z)(o.value.blocks),n=(()=>{const{selected:e,unselected:n}=t.value,r=n.reduce(((e,t)=>Math.max(e,t.zIndex)),-Number.MIN_SAFE_INTEGER);return e.forEach((e=>e.zIndex=r+1)),o.value.blocks})();return{redo:()=>{o.value={...o.value,blocks:n}},undo:()=>{o.value={...o.value,blocks:e}}}}}),l({name:"placeBottom",pushQueue:!0,execute(){const e=(0,d.Z)(o.value.blocks),n=(()=>{const{selected:e,unselected:n}=t.value;let r=n.reduce(((e,t)=>Math.min(e,t.zIndex)),Number.MAX_SAFE_INTEGER)-1;if(r<0){const e=Math.abs(r);r=0,n.forEach((t=>t.zIndex+=e))}return e.forEach((e=>e.zIndex=r)),console.log(n),o.value.blocks})();return{redo:()=>{o.value={...o.value,blocks:n}},undo:()=>{o.value={...o.value,blocks:e}}}}}),l({name:"del",pushQueue:!0,execute(){const e=(0,d.Z)(o.value.blocks),n=t.value.unselected;return{redo:()=>{o.value={...o.value,blocks:n}},undo:()=>{o.value={...o.value,blocks:e}}}}});const a=(()=>{const e={90:"z",89:"y"},t=t=>{const{ctrlKey:o,keyCode:r}=t;let l=[];o&&l.push("ctrl"),l.push(e[r]),l=l.join("+"),n.commandsArr.forEach((({keyboard:e,name:o})=>{e&&e===l&&(n.commands[o](),t.preventDefault())}))},o=()=>(window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)});return o})();return(()=>{n.destroyArr.push(a()),n.commandsArr.forEach((e=>e.init&&n.destroyArr.push(e.init())))})(),(0,r.Ah)((()=>{n.destroyArr.forEach((e=>e&&e()))})),n}const h=(0,r.aZ)({props:{option:{type:Object}},setup(e,t){const o=(0,s.qj)({isShow:!1,option:e.option});t.expose({showDialog(e){o.option=e,o.isShow=!0}});const l=()=>{o.isShow=!1},a=()=>{o.option.onConfirm(o.option.content),l()};return()=>(0,r.wy)((0,r.Wm)("div",{class:"modal"},[(0,r.Wm)("div",{class:"dialog-modal"},[(0,r.Wm)("header",{class:"header-modal"},[(0,r.Wm)("h2",{class:"tit"},[o.option.title]),(0,r.Wm)("span",{class:"close",onClick:l},[(0,r.Wm)("a",{href:"#",class:"bt"},null)])]),(0,r.Wm)("div",{class:"content-modal"},[(0,r.wy)((0,r.Wm)("textarea",{type:"text","onUpdate:modelValue":e=>o.option.content=e},null),[[n.nr,o.option.content]])]),(0,r.wy)((0,r.Wm)("footer",{class:"footer-modal"},[(0,r.Wm)("button",{onClick:a},[(0,r.Uk)("提交")])]),[[n.F8,o.option.hasFooter]])])]),[[n.F8,o.isShow]])}});let b;function g(e){if(!b){let t=document.createElement("div");b=(0,r.Wm)(h,{option:e}),document.body.appendChild(((0,n.sY)(b,t),t))}const{showDialog:t}=b.component.exposed;t(e)}var y=(0,r.aZ)({props:{modelValue:{type:Object}},emits:["update:modelValue"],components:{EditorBlock:c},setup(e,t){const o=(0,r.f3)("config"),l=(0,r.Fl)({get(){return e.modelValue},set(e){t.emit("update:modelValue",(0,d.Z)(e))}}),a=(0,r.Fl)((()=>({width:l.value.container.width+"px",height:l.value.container.height+"px"}))),u=(0,s.iH)(!1),i=(0,s.iH)(null),{dragstart:p,dragend:h}=v(i,l),{blcokMousedown:b,clearFocus:y,markLine:w,selectedStatus:k}=f(l,u),{commands:x}=m(l,k),E=[{label:"上一步",handler:()=>x.undo()},{label:"撤销上一步",handler:()=>x.redo()},{label:"删除",handler:()=>x.del()},{label:"置顶",handler:()=>x.placeTop()},{label:"置底",handler:()=>x.placeBottom()},{label:"导入JSON",handler:()=>{g({title:"导出完成",hasFooter:!0,onConfirm(e){x.updateContainer(JSON.parse(e))}})}},{label:"导出JSON",handler:()=>{g({title:"导出完成",content:JSON.stringify(l.value)})}},{label:()=>u.value?"编辑":"预览",steady:!0,handler:()=>{u.value=!u.value,y()}}];return()=>(0,r.Wm)("div",{class:"editor"},[(0,r.wy)((0,r.Wm)("div",{class:"editor-left"},[o.componentList.map((e=>(0,r.Wm)("div",{class:"preview-item",draggable:!0,onDragstart:t=>p(t,e),onDragend:h},[(0,r.Wm)("span",{class:"name"},[e.label]),(0,r.Wm)("div",{class:"component"},[e.preview()])])))]),[[n.F8,!u.value]]),(0,r.Wm)("div",{class:"editor-top"},[E.map((e=>(0,r.wy)((0,r.Wm)("div",{class:"editor-top-button",onClick:e.handler},[(0,r.Wm)("span",null,["function"===typeof e.label?e.label():e.label])]),[[n.F8,!u.value||e.steady]])))]),(0,r.wy)((0,r.Wm)("div",{class:"editor-right"},[(0,r.Uk)("右侧")]),[[n.F8,!u.value]]),(0,r.Wm)("div",{class:"editor-container"},[(0,r.Wm)("div",{class:"editor-canvas"},[(0,r.wy)((0,r.Wm)("div",{class:"editor-canvas-content",style:a.value,ref:i,onmousedown:y},[l.value.blocks.map(((e,t)=>(0,r.Wm)(c,{class:e.selected?"editor-block-selected":"",data:e,onmousedown:o=>b(o,e,t)},null))),null!==w.x&&(0,r.Wm)("div",{class:"line-x",style:{left:w.x+"px"}},null),null!==w.y&&(0,r.Wm)("div",{class:"line-y",style:{top:w.y+"px"}},null)]),[[n.F8,!u.value]]),(0,r.wy)((0,r.Wm)("div",{class:"editor-canvas-content",style:a.value},[l.value.blocks.map(((e,t)=>(0,r.Wm)(c,{class:"editor-block-preview",data:e},null)))]),[[n.F8,u.value]])])])])}});function w(){const e=[],t={};return{componentList:e,componentMap:t,register:o=>{e.push(o),t[o.type]=o}}}const k=w();k.register({label:"文本",preview:()=>"预览文本",render:()=>"渲染文本",type:"text"}),k.register({label:"按钮",preview:()=>(0,r.Wm)("button",null,[(0,r.Uk)("预览按钮")]),render:()=>(0,r.Wm)("button",null,[(0,r.Uk)("渲染按钮")]),type:"button"}),k.register({label:"输入框",preview:()=>(0,r.Wm)("input",{placeholder:"预览输入框"},null),render:()=>(0,r.Wm)("input",{placeholder:"渲染输入框"},null),type:"input"});var x={components:{VisualEditor:y},setup(){const e=(0,s.iH)(u);return(0,r.JJ)("config",k),{state:e}}},E=o(89);const W=(0,E.Z)(x,[["render",a]]);var L=W;(0,n.ri)(L).mount("#app")}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var l=t[n]={exports:{}};return e[n].call(l.exports,l,l.exports,o),l.exports}o.m=e,function(){var e=[];o.O=function(t,n,r,l){if(!n){var a=1/0;for(d=0;d<e.length;d++){n=e[d][0],r=e[d][1],l=e[d][2];for(var s=!0,u=0;u<n.length;u++)(!1&l||a>=l)&&Object.keys(o.O).every((function(e){return o.O[e](n[u])}))?n.splice(u--,1):(s=!1,l<a&&(a=l));if(s){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[n,r,l]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,l,a=n[0],s=n[1],u=n[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(u)var d=u(o)}for(t&&t(n);c<a.length;c++)l=a[c],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(d)},n=self["webpackChunkvisual_editor"]=self["webpackChunkvisual_editor"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(9717)}));n=o.O(n)})();