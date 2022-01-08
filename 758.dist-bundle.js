"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[758],{17758:(e,r,t)=>{t.r(r),t.d(r,{WorkerHasher:()=>h});var a=t(15671),s=t(43144),o=t(4942),n=t(71171),i=t.n(n),u=t(74029),c=t.n(u),h=function(){function e(r){(0,a.Z)(this,e),(0,o.Z)(this,"workers",[]),(0,o.Z)(this,"jobs",{});for(var t=0;t<r;++t)this.workers.push(this.createWorker())}return(0,s.Z)(e,[{key:"hash",value:function(e){return this.calculateHashInWorker(e)}},{key:"createWorker",value:function(){var e=this,r=c().createWorker(),t={worker:r,activeJobs:0};return r.addEventListener("message",(function(r){e.handleWorkerMessage(r,t)})),t}},{key:"handleWorkerMessage",value:function(e,r){var t=e.data.id;if(this.jobs[t]){var a=this.jobs[t],s=a.resolve,o=a.reject;delete this.jobs[t],r.activeJobs--,e.data.error?o(e.data.error):s(e.data.hash)}}},{key:"calculateHashInWorker",value:function(e){var r=this,t=i()();return new Promise((function(a,s){r.jobs[t]={resolve:a,reject:s};var o=r.getMostRelaxedWorker();r.dispatch(t,o,e)}))}},{key:"dispatch",value:function(e,r,t){r.activeJobs++;var a=r.worker;if(navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome")){var s=new FileReader;return s.onload=function(){a.postMessage({id:e,data:s.result})},void s.readAsBinaryString(t)}a.postMessage({id:e,data:t})}},{key:"getMostRelaxedWorker",value:function(){return this.workers.reduce((function(e,r){return r.activeJobs<e.activeJobs?r:e}),this.workers[0])}}]),e}()}}]);