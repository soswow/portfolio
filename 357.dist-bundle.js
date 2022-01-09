"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[357],{56404:(e,t,n)=>{t.Z=void 0;var r,i=(r=n(67294))&&r.__esModule?r:{default:r},l=n(95107);const a=e=>i.default.createElement(l.Icon,Object.assign({dangerouslySetGlyph:'<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill-rule="evenodd"><path d="M12.938 4.967c-.518-.978-1.36-.974-1.876 0L3.938 18.425c-.518.978-.045 1.771 1.057 1.771h14.01c1.102 0 1.573-.797 1.057-1.771L12.938 4.967z" fill="currentColor"/><path d="M12 15a1 1 0 01-1-1V9a1 1 0 012 0v5a1 1 0 01-1 1m0 3a1 1 0 010-2 1 1 0 010 2" fill="inherit"/></g></svg>'},e));a.displayName="WarningIcon";var c=a;t.Z=c},20304:(e,t,n)=>{n.r(t),n.d(t,{MediaInlineCard:()=>O,MediaInlineCardInternal:()=>B});var r,i=n(29439),l=n(67294),a=n(73935),c=n(38590),o=n(26799),s=n(15671),u=n(43144),f=n(97326),d=n(60136),m=n(82963),p=n(61120),v=n(4942),g=n(877),h=n(56404),y=n(90638),Z=n(95927),C=n(21933),E=n(30168),S=n(71893),R=n(68790),k=S.ZP.span(r||(r=(0,E.Z)(["\n  color: ",";\n"])),(0,R.Z)({light:g.N200}));var w=function(e){(0,d.Z)(i,e);var t,n,r=(t=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,p.Z)(t);if(n){var i=(0,p.Z)(this).constructor;e=Reflect.construct(r,arguments,i)}else e=r.apply(this,arguments);return(0,m.Z)(this,e)});function i(){var e;(0,s.Z)(this,i);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return e=r.call.apply(r,[this].concat(n)),(0,v.Z)((0,f.Z)(e),"renderMessage",(function(){var t=e.props.message,n=l.createElement(k,null,t);return l.createElement(l.Fragment,null,n)})),e}return(0,u.Z)(i,[{key:"render",value:function(){var e=this.props,t=e.onClick,n=e.isSelected,r=e.testId,i=void 0===r?"media-inline-card-errored-view":r,a=e.icon;return l.createElement(y.R,{testId:i,onClick:t,isSelected:n},l.createElement(Z.G,{icon:a||l.createElement(C.m,null,l.createElement(h.Z,{label:"error",size:"small",primaryColor:g.R300})),title:this.renderMessage()}))}}]),i}(l.Component);var I=function(e){(0,d.Z)(i,e);var t,n,r=(t=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,p.Z)(t);if(n){var i=(0,p.Z)(this).constructor;e=Reflect.construct(r,arguments,i)}else e=r.apply(this,arguments);return(0,m.Z)(this,e)});function i(){return(0,s.Z)(this,i),r.apply(this,arguments)}return(0,u.Z)(i,[{key:"render",value:function(){var e=this.props,t=e.title,n=void 0===t?"":t,r=e.isSelected,i=e.onClick,a=e.icon,c=e.testId,o=void 0===c?"media-inline-card-loaded-view":c,s=e.titlePrefix;return l.createElement(y.R,{testId:o,isSelected:r,onClick:i},l.createElement(Z.G,{emoji:s,icon:a,title:n}))}}]),i}(l.Component),M=n(67228),b=n(97133),N=n(54704),_=n(20484),x=n(25802),P=n(72e3),B=function(e){var t=e.mediaClient,n=e.identifier,r=e.shouldOpenMediaViewer,o=e.isSelected,s=e.onClick,u=e.mediaViewerDataSource,f=e.intl,d=(0,l.useState)(),m=(0,i.Z)(d,2),p=m[0],v=m[1],g=(0,l.useState)(!1),h=(0,i.Z)(g,2),y=h[0],Z=h[1],C=(0,l.useState)(!1),E=(0,i.Z)(C,2),S=E[0],R=E[1],k=function(){return R(!1)},B=(0,c.d)({locale:"en"});if((0,l.useEffect)((function(){t.file.getFileState(n.id,{collectionName:n.collectionName}).subscribe({next:function(e){v(e)},error:function(){Z(!0)}})}),[n.collectionName,n.id,t.file]),!p)return l.createElement(M.y,{message:(f||B).formatMessage(b.s.loading_file),isSelected:o});if(y)return l.createElement(w,{message:(f||B).formatMessage(b.s.couldnt_load_file),isSelected:o});if("error"===p.status)return l.createElement(w,{message:p.message||"",isSelected:o});if("failed-processing"===p.status)return l.createElement(w,{message:(f||B).formatMessage(b.s.couldnt_load_file),isSelected:o});if("uploading"===p.status)return l.createElement(M.y,{message:p.name,isSelected:o});var O,z,A=p.mediaType,F=p.name,G=l.createElement(N.w,{testId:"media-inline-card-file-type-icon",size:"small",type:A}),V=function(){if(S){var e=u||{list:[]};return a.createPortal(l.createElement(_.Z,{collectionName:n.collectionName||"",dataSource:e,mediaClientConfig:t.mediaClientConfig,selectedItem:n,onClose:k}),document.body)}return null}();if(p.createdAt){var j=(f||{locale:"en"}).locale,L=void 0===j?"en":j;O=(0,P.p6)(p.createdAt,L)}return z=l.createElement(l.Fragment,null,l.createElement(x.Z,{position:"bottom",content:O,tag:"span"},l.createElement(I,{icon:G,title:F,onClick:function(e){r&&R(!0),s&&s(e)},isSelected:o})),V),f?z:l.createElement(c.Z,{locale:"en"},z)},O=(0,o.ZP)(B,{enforceContext:!1})}}]);
//# sourceMappingURL=357.dist-bundle.js.map