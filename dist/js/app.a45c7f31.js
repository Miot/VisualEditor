(function(){"use strict";var e={3987:function(e,t,o){var l=o(9242),n=o(3396);const a={class:"app"};function s(e,t,o,l,s,r){const u=(0,n.up)("VisualEditor");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n.Wm)(u,{modelValue:l.state,"onUpdate:modelValue":t[0]||(t[0]=e=>l.state=e)},null,8,["modelValue"])])}var r=o(4870),u=JSON.parse('{"container":{"width":"550","height":"520"},"blocks":[{"top":100,"left":100,"zIndex":1,"type":"text","props":{"text":"渲染文本","size":"16px"}},{"top":200,"left":100,"zIndex":1,"type":"button","props":{"text":"渲染按钮","type":"base","size":"base"}},{"top":300,"left":100,"zIndex":1,"type":"input","props":{"text":""}}]}'),i=o(390),c=(0,n.aZ)({props:{block:{type:Object},component:{type:Object}},emits:["setBlock"],setup(e,t){let{value:o}=(0,r.qj)(e.block);const{width:l,height:a}=(0,r.qj)(e.component.resize);let s={};const u=(e,t)=>{e.stopPropagation(),o.hasResize||(o.originSize={width:o.width,height:o.height}),s={startX:e.clientX,startY:e.clientY,startWidth:o.width,startHeight:o.height,startLeft:o.left,startTop:o.top,direction:t},document.body.addEventListener("mousemove",i),document.body.addEventListener("mouseup",c)},i=e=>{let{clientX:l,clientY:n}=e;const{startX:a,startY:r,startHeight:u,startWidth:i,startLeft:c,startTop:d,direction:p}=s;"center"===p.x&&(l=a),"center"===p.y&&(n=r);let m=l-a,v=n-r;"top"===p.y&&(v=-v,o.top=Math.min(d-v,d+u-o.originSize.height)),"left"===p.x&&(m=-m,o.left=Math.min(c-m,c+i-o.originSize.width));const h=Math.max(i+m,o.originSize.width),f=Math.max(u+v,o.originSize.height);o.width=h,o.height=f,o.hasResize=!0,t.emit("setBlock",o)},c=()=>{document.body.removeEventListener("mousemove",i),document.body.removeEventListener("mouseup",c)};return()=>(0,n.Wm)(n.HY,null,[l&&(0,n.Wm)(n.HY,null,[(0,n.Wm)("div",{class:"block-resize block-resize-left",onMousedown:e=>u(e,{x:"left",y:"center"})},null),(0,n.Wm)("div",{class:"block-resize block-resize-right",onMousedown:e=>u(e,{x:"right",y:"center"})},null)]),a&&(0,n.Wm)(n.HY,null,[(0,n.Wm)("div",{class:"block-resize block-resize-top",onMousedown:e=>u(e,{x:"center",y:"top"})},null),(0,n.Wm)("div",{class:"block-resize block-resize-bottom",onMousedown:e=>u(e,{x:"center",y:"bottom"})},null)]),a&&l&&(0,n.Wm)(n.HY,null,[(0,n.Wm)("div",{class:"block-resize block-resize-top-left",onMousedown:e=>u(e,{x:"left",y:"top"})},null),(0,n.Wm)("div",{class:"block-resize block-resize-top-right",onMousedown:e=>u(e,{x:"right",y:"top"})},null),(0,n.Wm)("div",{class:"block-resize block-resize-bottom-left",onMousedown:e=>u(e,{x:"left",y:"bottom"})},null),(0,n.Wm)("div",{class:"block-resize block-resize-bottom-right",onMousedown:e=>u(e,{x:"right",y:"bottom"})},null)])])}}),d=(0,n.aZ)({props:{modelValue:{type:Object},containerStyle:{width:Number,height:Number}},components:{BlockResize:c},emits:["update:modelValue"],setup(e,t){let o=(0,n.Fl)({get(){return e.modelValue},set(e){t.emit("update:modelValue",(0,i.Z)(e))}});(0,n.YP)((()=>e.modelValue),(async()=>{const{offsetWidth:e}=s.value;await(0,n.Y3)();const{offsetWidth:t,offsetHeight:l}=s.value;e!==t&&(o.value.width=t,o.value.height=l)}),{immediate:!1});const l=(0,n.Fl)((()=>({top:`${o.value.top}px`,left:`${o.value.left}px`,zIndex:`${o.value.zIndex}`}))),a=(0,n.f3)("config"),s=(0,r.iH)(null);return(0,n.bv)((()=>{const{offsetWidth:t,offsetHeight:l}=s.value,{width:n,height:a}=e.containerStyle;o.value.width=t,o.value.height=l,o.value.alignCenter&&(o.value.alignCenter=!1,o.value.left=Math.min(Math.max(0,o.value.left-t/2),n-t),o.value.top=Math.min(Math.max(0,o.value.top-l/2),a-l))})),()=>{const e=a.componentMap[o.value.type],t=e?.render({size:o.value.hasResize?{width:o.value.width,height:o.value.height}:{},props:o.value.props}),{width:r,height:u}=e.resize||{},i=e=>{o.value={...e}};return(0,n.Wm)("div",{class:"editor-block",style:l.value,ref:s},[t,o.value.selected&&(r||u)&&(0,n.Wm)(c,{block:o,component:e,onSetBlock:i},null)])}}}),p=(o(7658),o(1373));const m=(0,p.Z)();function v(e,t){let o=null;const l=e=>{e.dataTransfer.dropEffect="move"},n=e=>{e.preventDefault()},a=e=>{e.dataTransfer.dropEffect="none"},s=e=>{t.value.blocks.push({top:e.offsetY,left:e.offsetX,zIndex:1,type:o.type,alignCenter:!0,props:o.defaultOptions})},r=(t,r)=>{o=r;const u=e.value;u.addEventListener("dragenter",l),u.addEventListener("dragover",n),u.addEventListener("dragleave",a),u.addEventListener("drop",s),m.emit("start")},u=()=>{const t=e.value;t.removeEventListener("dragenter",l),t.removeEventListener("dragover",n),t.removeEventListener("dragleave",a),t.removeEventListener("drop",s),m.emit("end")};return{dragstart:r,dragend:u}}function h(e,t){const o=(0,r.iH)(-1),l=(0,n.Fl)((()=>e.value.blocks[o.value])),a=(0,n.Fl)((()=>({selected:e.value.blocks.filter((e=>e.selected)),unselected:e.value.blocks.filter((e=>!e.selected))}))),s=(e,l,n)=>{if(t.value)return;e.preventDefault(),e.stopPropagation();const s=a.value.selected.length;e.shiftKey?l.selected=!l.selected:l.selected||(s>=1&&u(),l.selected=!0),o.value=n,d(e)},u=()=>{t.value||(e.value.blocks.forEach((e=>e.selected=!1)),o.value=-1)};let i={startX:0,startY:0,dragging:!1},c=(0,r.qj)({x:null,y:null});const d=t=>{const{width:o,height:n}=l.value;i={dragging:!1,startX:t.clientX,startY:t.clientY,startLeft:l.value.left,startTop:l.value.top,startPos:a.value.selected.map((({top:e,left:t})=>({top:e,left:t}))),lines:(()=>{const{unselected:t}=a.value;let l={x:[],y:[]};return[...t,{top:0,left:0,width:+e.value.container.width,height:+e.value.container.height}].forEach((e=>{const{top:t,left:a,width:s,height:r}=e;l.y.push({showTop:t,top:t}),l.y.push({showTop:t,top:t-n}),l.y.push({showTop:t+r/2,top:t+r/2-n/2}),l.y.push({showTop:t+r,top:t+r}),l.y.push({showTop:t+r,top:t+r-n}),l.x.push({showLeft:a,left:a}),l.x.push({showLeft:a+s,left:a+s}),l.x.push({showLeft:a+s/2,left:a+s/2-o/2}),l.x.push({showLeft:a+s,left:a+s-o}),l.x.push({showLeft:a,left:a-o})})),l})()},document.addEventListener("mousemove",p),document.addEventListener("mouseup",v)},p=t=>{let{clientX:o,clientY:n}=t;const{width:a,height:s}=l.value;i.dragging||(i.dragging=!0,m.emit("start"));const r=o-i.startX+i.startLeft,u=n-i.startY+i.startTop;let d=null,p=null;const v=i.lines;for(let e=0;e<v.y.length;e++){const{showTop:t,top:o}=v.y[e];if(Math.abs(o-u)<5){d=t,n=i.startY-i.startTop+o;break}}for(let e=0;e<v.x.length;e++){const{showLeft:t,left:l}=v.x[e];if(Math.abs(l-r)<5){p=t,o=i.startX-i.startLeft+l;break}}c.x=p,c.y=d;const h=o-i.startX,f=n-i.startY;e.value.blocks.filter((e=>e.selected)).forEach(((t,o)=>{t.top=Math.min(e.value.container.height-s,i.startPos[o].top+Math.max(f,-i.startPos[o].top)),t.left=Math.min(e.value.container.width-a,i.startPos[o].left+Math.max(h,-i.startPos[o].left))}))},v=e=>{document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",v),c.x=null,c.y=null,i.dragging&&(i.dragging=!1)};return{blcokMousedown:s,clearFocus:u,lastSelectedBlock:l,markLine:c,selectedStatus:a}}function f(e,t){const o=(0,r.qj)(e),l={curr:-1,queue:[],commands:{},commandsArr:[],destroyArr:[]},a=e=>{l.commandsArr.push(e),l.commands[e.name]=(...t)=>{const{redo:o,undo:n}=e.execute(...t);if(o(),!e.pushQueue)return;let{curr:a,queue:s}=l;s.length&&(s=s.slice(0,a+1),l.queue=s),s.push({redo:o,undo:n}),l.curr=a+1}};a({name:"redo",keyboard:"ctrl+y",execute(){return{redo(){const e=l.queue[l.curr+1];e&&(e.redo&&e.redo(),l.curr++)}}}}),a({name:"undo",keyboard:"ctrl+z",execute(){return{redo(){if(-1===l.curr)return;const e=l.queue[l.curr];e&&(e.undo&&e.undo(),l.curr--)}}}}),a({name:"drag",pushQueue:!0,init(){this.before=[];const e=()=>{this.before=(0,i.Z)(o.value.blocks)},t=()=>l.commands.drag();return m.on("start",e),m.on("end",t),()=>{m.off("start"),m.off("end")}},execute(){const e=this.before,t=o.value.blocks;return{redo(){o.value={...o.value,blocks:t}},undo(){o.value.blocks=[...e]}}}}),a({name:"updateContainer",pushQueue:!0,execute(e){const t={before:o.value,after:e};return{redo:()=>{o.value=t.after},undo:()=>{o.value=t.before}}}}),a({name:"updateBlock",pushQueue:!0,execute(e,t){const l={before:o.value.blocks,after:(()=>{let l=(0,i.Z)(o.value.blocks);const n=o.value.blocks.indexOf(e);return n>-1&&l.splice(n,1,t),l})()};return{redo:()=>{o.value.blocks=[...l.after]},undo:()=>{o.value={...o.value,blocks:l.before}}}}}),a({name:"placeTop",pushQueue:!0,execute(){const e=(0,i.Z)(o.value.blocks),l=(()=>{const{selected:e,unselected:l}=t.value,n=l.reduce(((e,t)=>Math.max(e,t.zIndex)),-Number.MIN_SAFE_INTEGER);return e.forEach((e=>e.zIndex=n+1)),o.value.blocks})();return{redo:()=>{o.value={...o.value,blocks:l}},undo:()=>{o.value={...o.value,blocks:e}}}}}),a({name:"placeBottom",pushQueue:!0,execute(){const e=(0,i.Z)(o.value.blocks),l=(()=>{const{selected:e,unselected:l}=t.value;let n=l.reduce(((e,t)=>Math.min(e,t.zIndex)),Number.MAX_SAFE_INTEGER)-1;if(n<0){const e=Math.abs(n);n=0,l.forEach((t=>t.zIndex+=e))}return e.forEach((e=>e.zIndex=n)),o.value.blocks})();return{redo:()=>{o.value={...o.value,blocks:l}},undo:()=>{o.value={...o.value,blocks:e}}}}}),a({name:"del",pushQueue:!0,execute(){const e=(0,i.Z)(o.value.blocks),l=t.value.unselected;return{redo:()=>{o.value={...o.value,blocks:l}},undo:()=>{o.value={...o.value,blocks:e}}}}});const s=(()=>{const e={90:"z",89:"y"},t=t=>{const{ctrlKey:o,keyCode:n}=t;let a=[];o&&a.push("ctrl"),a.push(e[n]),a=a.join("+"),l.commandsArr.forEach((({keyboard:e,name:o})=>{e&&e===a&&(l.commands[o](),t.preventDefault())}))},o=()=>(window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)});return o})();return(()=>{l.destroyArr.push(s()),l.commandsArr.forEach((e=>e.init&&l.destroyArr.push(e.init())))})(),(0,n.Ah)((()=>{l.destroyArr.forEach((e=>e&&e()))})),l}const b=(0,n.aZ)({props:{option:{type:Object}},setup(e,t){const o=(0,r.qj)({isShow:!1,option:e.option});t.expose({showDialog(e){o.option=e,o.isShow=!0}});const a=()=>{o.isShow=!1},s=()=>{try{o.option.onConfirm(o.option.content),a()}catch(e){alert("⚠️输入内容为非法JSON⚠️")}};return()=>(0,n.wy)((0,n.Wm)("div",{class:"modal"},[(0,n.Wm)("div",{class:"dialog-modal"},[(0,n.Wm)("header",{class:"header-modal"},[(0,n.Wm)("h2",{class:"tit"},[o.option.title]),(0,n.Wm)("span",{class:"close",onClick:a},[(0,n.Wm)("a",{href:"#",class:"bt"},null)])]),(0,n.Wm)("div",{class:"content-modal"},[(0,n.wy)((0,n.Wm)("textarea",{type:"text","onUpdate:modelValue":e=>o.option.content=e},null),[[l.nr,o.option.content]])]),(0,n.wy)((0,n.Wm)("footer",{class:"footer-modal"},[(0,n.Wm)("button",{onClick:s},[(0,n.Uk)("提交")])]),[[l.F8,o.option.hasFooter]])])]),[[l.F8,o.isShow]])}});let y;function g(e){if(!y){let t=document.createElement("div");y=(0,n.Wm)(b,{option:e}),document.body.appendChild(((0,l.sY)(y,t),t))}const{showDialog:t}=y.component.exposed;t(e)}const k=(0,n.aZ)({props:{option:{type:Object}},setup(e,t){const o=(0,r.qj)({option:e.option,isShow:!1,left:0,top:0}),a=(0,n.Fl)((()=>({top:o.top+"px",left:o.left+"px"}))),s=(0,r.iH)(null),u=()=>{o.isShow=!1,document.removeEventListener("mousedown",i,!0)},i=e=>{s.value.contains(e.target)||u()};return t.expose({showDropdown(e){o.option=e,o.isShow=!0;const{clientX:t,clientY:l}=e.event;o.top=l,o.left=t,document.addEventListener("mousedown",i,!0)},hide:u}),()=>(0,n.wy)((0,n.Wm)("div",{class:"dropdown",style:a.value,ref:s},[o.option.content()]),[[l.F8,o.isShow]])}});let w;function x(e){if(!w){let t=document.createElement("div");w=(0,n.Wm)(k,{option:e}),document.body.appendChild(((0,l.sY)(w,t),t))}const{showDropdown:t}=w.component.exposed;t(e)}const W=(0,n.aZ)({props:{label:String},setup(e){return()=>(0,n.Wm)("div",{class:"dropdown-item",onClick:w.component.exposed.hide},[(0,n.Wm)("span",null,[e.label])])}});var z=(0,n.aZ)({props:{multipleSelected:{type:Boolean},block:{type:Object},data:{type:Object},updateContainer:{type:Function},updateBlock:{type:Function}},setup(e,t){const o=(0,n.f3)("config"),a=(0,r.qj)({editData:{}}),s=()=>{a.editData=(0,i.Z)(e.block?e.block:e.data.container)},u=()=>{e.block?e.updateBlock(e.block,a.editData):e.updateContainer({...e.data,container:a.editData})};return(0,n.YP)((()=>e.block),s,{immediate:!0}),()=>{let t=[];if(e.block){const s=o.componentMap[e.block.type];s&&s.props&&t.push(Object.entries(s.props).map((([e,t])=>(0,n.Wm)("div",{class:"form-item"},[(0,n.Wm)("p",{class:"form-lable"},[t.label]),{input:()=>(0,n.wy)((0,n.Wm)("input",{type:"text",key:"text-input","onUpdate:modelValue":t=>a.editData.props[e]=t},null),[[l.nr,a.editData.props[e]]]),select:()=>(0,n.Wm)("div",{class:"form-selector"},[(0,n.wy)((0,n.Wm)("select",{id:"select","onUpdate:modelValue":t=>a.editData.props[e]=t},[t.options.map((t=>(0,n.Wm)("option",{value:t.value,selected:t.value===a.editData.props[e]},[t.label])))]),[[l.bM,a.editData.props[e]]])])}[t.type]()]))))}else t.push((0,n.Wm)(n.HY,null,[(0,n.Wm)("div",{class:"form-item"},[(0,n.Wm)("p",{class:"form-lable"},[(0,n.Uk)("容器宽度")]),(0,n.wy)((0,n.Wm)("input",{type:"number",oninput:"value=value.replace(/[^\\d]/g,'')","onUpdate:modelValue":e=>a.editData.width=e,key:"width-input"},null),[[l.nr,a.editData.width]])," ",(0,n.Uk)("px")]),(0,n.Wm)("div",{class:"form-item"},[(0,n.Wm)("p",{class:"form-lable"},[(0,n.Uk)("容器高度")]),(0,n.wy)((0,n.Wm)("input",{type:"number",oninput:"value=value.replace(/[^\\d]/g,'')","onUpdate:modelValue":e=>a.editData.height=e,key:"height-input"},null),[[l.nr,a.editData.height]])," ",(0,n.Uk)("px")])]));return e.multipleSelected?(0,n.Wm)(n.HY,null,null):(0,n.Wm)(n.HY,null,[t,(0,n.Wm)("button",{onClick:()=>s()},[(0,n.Uk)("重置")]),(0,n.Wm)("button",{onClick:()=>u()},[(0,n.Uk)("确定")])])}}}),E=(0,n.aZ)({props:{modelValue:{type:Object}},emits:["update:modelValue"],components:{EditorBlock:d,DropdownItem:W},setup(e,t){const o=(0,n.f3)("config"),a=(0,n.Fl)({get(){return e.modelValue},set(e){t.emit("update:modelValue",(0,i.Z)(e))}}),s=(0,n.Fl)((()=>({width:a.value.container.width+"px",height:a.value.container.height+"px"}))),u=(0,r.iH)(!1),c=(0,r.iH)(null),{dragstart:p,dragend:m}=v(c,a),{blcokMousedown:b,clearFocus:y,lastSelectedBlock:k,markLine:w,selectedStatus:E}=h(a,u),{commands:S}=f(a,E),M=[{label:"上一步",handler:()=>S.undo()},{label:"撤销上一步",handler:()=>S.redo()},{label:"删除",handler:()=>S.del()},{label:"置顶",handler:()=>S.placeTop()},{label:"置底",handler:()=>S.placeBottom()},{label:"导入JSON",handler:()=>{g({title:"导出完成",hasFooter:!0,onConfirm(e){S.updateContainer(JSON.parse(e))}})}},{label:"导出JSON",handler:()=>{g({title:"导出完成",content:JSON.stringify(a.value)})}},{label:()=>u.value?"编辑":"预览",steady:!0,handler:()=>{u.value=!u.value,y()}}],O=(e,t)=>{e.preventDefault(),x({event:e,content:()=>(0,n.Wm)(n.HY,null,[(0,n.Wm)(W,{label:"删除",onClick:()=>S.del()},null),(0,n.Wm)(W,{label:"置顶",onClick:()=>S.placeTop()},null),(0,n.Wm)(W,{label:"置底",onClick:()=>S.placeBottom()},null),(0,n.Wm)(W,{label:"查看JSON",onClick:()=>{g({title:"查看节点JSON数据",content:JSON.stringify(t)})}},null),(0,n.Wm)(W,{label:"替换",onClick:()=>{g({title:"通过JSON替换节点",hasFooter:!0,onConfirm(e){S.updateBlock(t,JSON.parse(e))}})}},null)])})};return()=>(0,n.Wm)("div",{class:"editor"},[(0,n.wy)((0,n.Wm)("div",{class:"editor-left"},[o.componentList.map((e=>(0,n.Wm)("div",{class:"preview-item",draggable:!0,onDragstart:t=>p(t,e),onDragend:m},[(0,n.Wm)("span",{class:"name"},[e.label]),(0,n.Wm)("div",{class:"component"},[e.preview()])])))]),[[l.F8,!u.value]]),(0,n.Wm)("div",{class:"editor-top"},[M.map((e=>(0,n.wy)((0,n.Wm)("div",{class:"editor-top-button",onClick:e.handler},[(0,n.Wm)("span",null,["function"===typeof e.label?e.label():e.label])]),[[l.F8,!u.value||e.steady]])))]),(0,n.wy)((0,n.Wm)("div",{class:"editor-right"},[(0,n.Wm)(z,{multipleSelected:E.value.selected.length>1,block:k.value,data:a.value,updateContainer:S.updateContainer,updateBlock:S.updateBlock},null)]),[[l.F8,!u.value]]),(0,n.Wm)("div",{class:"editor-container"},[(0,n.Wm)("div",{class:"editor-canvas"},[(0,n.wy)((0,n.Wm)("div",{class:"editor-canvas-content",style:s.value,ref:c,onMousedown:y},[a.value.blocks.map(((e,t)=>(0,n.Wm)(d,{class:e.selected?"editor-block-selected":"",modelValue:e,"onUpdate:modelValue":t=>e=t,containerStyle:a.value.container,onMousedown:o=>b(o,e,t),onContextmenu:t=>O(t,e)},null))),null!==w.x&&(0,n.Wm)("div",{class:"line-x",style:{left:w.x+"px"}},null),null!==w.y&&(0,n.Wm)("div",{class:"line-y",style:{top:w.y+"px"}},null)]),[[l.F8,!u.value]]),u.value&&(0,n.Wm)("div",{class:"editor-canvas-content",style:s.value},[a.value.blocks.map((e=>(0,n.Wm)(d,{class:"editor-block-preview",modelValue:e,"onUpdate:modelValue":t=>e=t},null)))])])])])}});function S(){const e=[],t={};return{componentList:e,componentMap:t,register:o=>{e.push(o),t[o.type]=o}}}const M=S(),O=e=>({type:"input",label:e}),L=(e,t)=>({type:"select",label:e,options:t});M.register({label:"文本",preview:()=>"预览文本",render:({props:e})=>(0,n.Wm)("span",{style:{fontSize:e.size,userSelect:"none"}},[e.text||"渲染文本"]),type:"text",props:{text:O("输入文本内容"),size:L("字体大小",[{label:"14px",value:"14px"},{label:"16px",value:"16px"},{label:"18px",value:"18px"}])},defaultOptions:{text:"渲染文本",size:"16px"}}),M.register({label:"按钮",resize:{width:!0,height:!0},preview:()=>(0,n.Wm)("button",null,[(0,n.Uk)("预览按钮")]),render:({props:e,size:t})=>(0,n.Wm)("button",{class:`button-${e.type} button-${e.size}`,style:{height:t.height+"px",width:t.width+"px"}},[e.text||"渲染按钮"]),type:"button",props:{text:O("按钮文本"),type:L("按钮类型",[{label:"默认",value:"base"},{label:"成功",value:"success"},{label:"警告",value:"warning"},{label:"错误",value:"error"}]),size:L("按钮大小",[{label:"默认",value:"base"},{label:"小",value:"small"},{label:"大",value:"large"}])},defaultOptions:{text:"渲染按钮",type:"base",size:"base"}}),M.register({label:"输入框",resize:{width:!0},preview:()=>(0,n.Wm)("input",{placeholder:"预览输入框"},null),render:({props:e,size:t})=>(0,n.wy)((0,n.Wm)("input",{placeholder:"渲染输入框","onUpdate:modelValue":t=>e.text=t,style:{width:t.width+"px"}},null),[[l.nr,e.text]]),type:"input",props:{text:O("输入框文本")},defaultOptions:{text:""}});var C={components:{VisualEditor:E},setup(){const e=(0,r.iH)(u);return(0,n.JJ)("config",M),{state:e}}},Y=o(89);const D=(0,Y.Z)(C,[["render",s]]);var F=D;(0,l.ri)(F).mount("#app")}},t={};function o(l){var n=t[l];if(void 0!==n)return n.exports;var a=t[l]={exports:{}};return e[l].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,l,n,a){if(!l){var s=1/0;for(c=0;c<e.length;c++){l=e[c][0],n=e[c][1],a=e[c][2];for(var r=!0,u=0;u<l.length;u++)(!1&a||s>=a)&&Object.keys(o.O).every((function(e){return o.O[e](l[u])}))?l.splice(u--,1):(r=!1,a<s&&(s=a));if(r){e.splice(c--,1);var i=n();void 0!==i&&(t=i)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[l,n,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var l in t)o.o(t,l)&&!o.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,l){var n,a,s=l[0],r=l[1],u=l[2],i=0;if(s.some((function(t){return 0!==e[t]}))){for(n in r)o.o(r,n)&&(o.m[n]=r[n]);if(u)var c=u(o)}for(t&&t(l);i<s.length;i++)a=s[i],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(c)},l=self["webpackChunkvisual_editor"]=self["webpackChunkvisual_editor"]||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var l=o.O(void 0,[998],(function(){return o(3987)}));l=o.O(l)})();