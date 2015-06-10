(function ensightenInit(){var ensightenOptions = {client: "technet", clientId: 655, publishPath: "dev", isPublic:0, serverComponentLocation: "nexus.ensighten.com/technet/dev/serverComponent.php", staticJavascriptPath: "nexus.ensighten.com/technet/dev/code/", ns: 'Bootstrapper', nexus:"nexus.ensighten.com", scUseCacheBuster: "true", enableTagAuditBeacon : "true", enablePagePerfBeacon : "true", registryNs : "ensBootstraps", generatedOn : "Mon Apr 28 23:28:16 GMT 2014", beaconSamplingSeedValue: 11};
if ( !window[ensightenOptions.ns] ) {
window[ensightenOptions.registryNs]||(window[ensightenOptions.registryNs]={});
window[ensightenOptions.registryNs][ensightenOptions.ns]=window[ensightenOptions.ns]=function(g){function m(a){this.name="DependencyNotAvailableException";this.message="Dependency with id "+a+"is never available"}function n(a){this.name="BeaconException";this.message="There was an error durring beacon initialization";this.err=a}function p(){for(var a=b.dataDefinitionIds.length,e=!0,d=0;d<a;d++){var c=b.dataDefinitions[b.dataDefinitionIds[d]];if(!c||null==c.endRegistration){e=!1;break}}e&&b.callOnDataDefintionComplete()}
var c={},b={};b.ensightenOptions=ensightenOptions;b.scDataObj={};c.version="1.19.0";c.nexus=g.nexus||"nexus.ensighten.com";c.rand=-1;c.currSec=(new Date).getSeconds();c.options={interval:g.interval||100,erLoc:g.errorLocation||c.nexus+"/error/e.gif",scLoc:g.serverComponentLocation||c.nexus+"/"+g.client+"/serverComponent.php",sjPath:g.staticJavascriptPath||c.nexus+"/"+g.client+"/code/",alLoc:g.alertLocation||c.nexus+"/alerts/a.gif",publishPath:g.publishPath,isPublic:g.isPublic,client:g.client,clientId:g.clientId,
enableTagAuditBeacon:g.enableTagAuditBeacon,scUseCacheBuster:g.scUseCacheBuster,beaconSamplingSeedValue:g.beaconSamplingSeedValue||-1};c.ruleList=[];c.exceptionList=[];c.ensightenVariables={};c.test=function(a){if(!(a.executionData.hasRun||a.executionData.runTime&&0<a.executionData.runTime.length)){for(var b=0;b<a.dependencies.length;b++)if(!1===a.dependencies[b]())return;a.execute()}};m.prototype=Error();m.prototype||(m.prototype={});m.prototype.constructor=m;c.DependencyNotAvailableException=m;
n.prototype=Error();n.prototype||(n.prototype={});n.prototype.constructor=n;c.BeaconException=n;c.checkForInvalidDependencies=function(a,e,d,l){for(a=0;a<d.length;a++)if("DEPENDENCYNEVERAVAILABLE"===d[a])return b.currentRuleId=this.id,b.currentDeploymentId=this.deploymentId,b.reportException(new c.DependencyNotAvailableException(l[a])),!0;return!1};b.currentRuleId=-1;b.currentDeploymentId=-1;b.reportedErrors=[];b.reportedAlerts=[];b.AF=[];b._serverTime="";b._clientIP="";b.sampleBeacon=function(){var a=
!1;try{var b=(c.currSec||0)%20,d=c.options.beaconSamplingSeedValue;-1===d?a=!0:0!==b&&0===d%b&&(a=!0)}catch(l){}return a};b.getServerComponent=function(a){b.callOnGetServerComponent();b.insertScript(window.location.protocol+"//"+c.options.scLoc,!1,a||!0,c.options.scUseCacheBuster)};b.setVariable=function(a,b){c.ensightenVariables[a]=b};b.getVariable=function(a){return a in c.ensightenVariables?c.ensightenVariables[a]:null};b.testAll=function(){for(var a=0;a<c.ruleList.length;a++)c.test(c.ruleList[a])};
b.executionState={DOMParsed:!1,DOMLoaded:!1,dataDefinitionComplete:!1,conditionalRules:!1,readyForServerComponent:!1};b.reportException=function(a){a.timestamp=(new Date).getTime();c.exceptionList.push(a);a=b.imageRequest(window.location.protocol+"//"+c.options.erLoc+"?msg="+a.message+"&lnn="+(a.lineNumber||a.line)+"&fn="+(a.fileName||a.sourceURL)+"&cid="+c.options.clientId+"&client="+c.options.client+"&publishPath="+c.options.publishPath+"&rid="+b.currentRuleId+"&did="+b.currentDeploymentId);a.timestamp=
(new Date).getTime();this.reportedErrors.push(a)};b.Rule=function(a){this.execute=function(){this.executionData.runTime.push(new Date);b.currentRuleId=this.id;b.currentDeploymentId=this.deploymentId;try{this.code()}catch(a){window[ensightenOptions.ns].reportException(a)}finally{this.executionData.hasRun=!0,b.testAll()}};this.id=a.id;this.deploymentId=a.deploymentId;this.dependencies=a.dependencies||[];this.code=a.code;this.executionData={hasRun:!1,runTime:[]}};b.registerRule=function(a){if(b.getRule(a.id)&&
-1!==a.id)return!1;c.ruleList.push(a);b.testAll();return!0};b.getRule=function(a){for(var b=0;b<c.ruleList.length;b++)if(c.ruleList[b].id===a)return c.ruleList[b];return!1};

b.hasRuleRun=function(a){return(a=b.getRule(a))?a.executionData.hasRun:!1};c.toTwoChar=function(a){return(2===a.toString().length?"":"0")+a};b.Alert=function(a){var b=new Date,b=b.getFullYear()+"-"+c.toTwoChar(b.getMonth())+"-"+c.toTwoChar(b.getDate())+
" "+c.toTwoChar(b.getHours())+":"+c.toTwoChar(b.getMinutes())+":"+c.toTwoChar(b.getSeconds());this.severity=a.severity||1;this.date=b;this.subject=a.subject||"";this.type=a.type||1;this.ruleId=a.ruleId||-1};b.generateAlert=function(a){a=b.imageRequest(window.location.protocol+"//"+c.options.alLoc+"?d="+a.date+"&su="+a.subject+"&se="+a.severity+"&t="+a.type+"&cid="+c.options.clientId+"&client="+c.options.client+"&publishPath="+c.options.publishPath+"&rid="+b.currentRuleId+"&did="+b.currentDeploymentId);
a.timestamp=(new Date).getTime();this.reportedAlerts.push(a)};b.imageRequest=function(a){var b=new Image(0,0);b.src=a;return b};b.insertScript=function(a,e,d,l){var h=document.getElementsByTagName("script"),f;l=void 0!==l?l:!0;if(void 0!==e?e:1)for(f=0;f<h.length;f++)if(h[f].src===a&&h[f].readyState&&/loaded|complete/.test(h[f].readyState))return;if(d){d=!0==d&&"object"==typeof b.scDataObj?b.scDataObj:d;c.rand=Math.random()*("1E"+(10*Math.random()).toFixed(0));e=window.location.href;if("object"===
typeof d)for(f in d){f=~e.indexOf("#")?e.slice(e.indexOf("#"),e.length):"";e=e.slice(0,f.length?e.length-f.length:e.length);e+=~e.indexOf("?")?"&":"?";for(k in d)e+=k+"="+d[k]+"&";e=e.slice(0,-1)+f;break}a+="?";l&&(a+="r="+c.rand+"&");a+="ClientID="+c.options.clientId+"&PageID="+encodeURIComponent(e)}(function(a,b,e){var d=b.head||b.getElementsByTagName("head");setTimeout(function(){if("item"in d){if(!d[0]){setTimeout(arguments.callee,25);return}d=d[0]}var a=b.createElement("script");a.src=e;a.onload=
a.onerror=function(){this.addEventListener&&(this.readyState="loaded")};d.insertBefore(a,d.firstChild)},0)})(window,document,a)};b.loadScriptCallback=function(a,b,d){var c=document.getElementsByTagName("script"),h;d=c[0];for(h=0;h<c.length;h++)if(c[h].src===a&&c[h].readyState&&/loaded|complete/.test(c[h].readyState))try{b()}catch(f){window[ensightenOptions.ns].reportException(f)}finally{return}c=document.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;c.onerror=function(){this.addEventListener&&
(this.readyState="loaded")};c.onload=c.onreadystatechange=function(){if(!this.readyState||"complete"===this.readyState||"loaded"===this.readyState){this.onload=this.onreadystatechange=null;this.addEventListener&&(this.readyState="loaded");try{b.call(this)}catch(a){window[ensightenOptions.ns].reportException(a)}}};d.parentNode.insertBefore(c,d)};b.unobtrusiveAddEvent=function(a,b,d){try{var c=a[b]?a[b]:function(){};a[b]=function(){d.apply(this,arguments);return c.apply(this,arguments)}}catch(h){window[ensightenOptions.ns].reportException(h)}};
b.anonymous=function(a,e){return function(){try{b.currentRuleId=e?e:"anonymous",a()}catch(d){window[ensightenOptions.ns].reportException(d)}}};b.setCurrentRuleId=function(a){b.currentRuleId=a};b.setCurrentDeploymentId=function(a){b.currentDeploymentId=a};b.bindImmediate=function(a,e,d){if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:d||-1,dependencies:[],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDOMParsed=function(a,e,d){if("function"===typeof a)a=new b.Rule({id:e||
-1,deploymentId:d||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.DOMParsed}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDOMLoaded=function(a,e,d){if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:d||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.DOMLoaded}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindPageSpecificCompletion=function(a,e,d){if("function"===typeof a)a=new b.Rule({id:e||
-1,deploymentId:d||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.conditionalRules}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindOnGetServerComponent=function(a,e,d){if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:d||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.readyForServerComponent}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDataDefinitionComplete=function(a,e,d){if("function"===
typeof a)a=new b.Rule({id:e||-1,deploymentId:d||-1,dependencies:[function(){return window[ensightenOptions.ns].executionState.dataDefinitionComplete}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.checkHasRun=function(a){if(0===a.length)return!0;for(var e,d=0;d<a.length;++d)if(e=b.getRule(parseInt(a[d],10)),!e||!e.executionData.hasRun)return!1;return!0};b.bindDependencyImmediate=function(a,e,d,l,h){var f=[];if(!c.checkForInvalidDependencies(e,l,d,h)){f.push(function(){return window[ensightenOptions.ns].checkHasRun(d)});
if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:l||-1,dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)}};b.bindDependencyDOMLoaded=function(a,e,d,l,h){var f=[];if(!c.checkForInvalidDependencies(e,l,d,h)){f.push(function(){return window[ensightenOptions.ns].executionState.DOMLoaded});f.push(function(){return window[ensightenOptions.ns].checkHasRun(d)});if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:l||-1,dependencies:f,code:a});else if("object"!==
typeof a)return!1;b.registerRule(a)}};b.bindDependencyDOMParsed=function(a,e,d,l,h){var f=[];if(!c.checkForInvalidDependencies(e,l,d,h)){f.push(function(){return window[ensightenOptions.ns].executionState.DOMParsed});f.push(function(){return window[ensightenOptions.ns].checkHasRun(d)});if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:l||-1,dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)}};b.bindDependencyPageSpecificCompletion=function(a,e,d,l,h){var f=[];
if(!c.checkForInvalidDependencies(e,l,d,h)){f.push(function(){return window[ensightenOptions.ns].executionState.conditionalRules});f.push(function(){return window[ensightenOptions.ns].checkHasRun(d)});if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:l||-1,dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)}};b.bindDependencyOnGetServerComponent=function(a,e,d,l,h){var f=[];if(!c.checkForInvalidDependencies(e,l,d,h)){f.push(function(){return window[ensightenOptions.ns].executionState.readyForServerComponent});
f.push(function(){return window[ensightenOptions.ns].checkHasRun(d)});if("function"===typeof a)a=new b.Rule({id:e||-1,deploymentId:l||-1,dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)}};b.bindDependencyPageSpecificCompletion=function(a,e,d,l,h){var f=[];if(!c.checkForInvalidDependencies(e,l,d,h)){f.push(function(){return window[ensightenOptions.ns].executionState.dataDefinitionComplete});f.push(function(){return window[ensightenOptions.ns].checkHasRun(d)});if("function"===
typeof a)a=new b.Rule({id:e||-1,deploymentId:l||-1,dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)}};b.dataDefintionIds=[];b.dataDefinitions=[];b.pageSpecificDataDefinitionsSet=!1;b.setPageSpecificDataDefinitionIds=function(a){for(var e=a.length,d=0;d<e;d++){var c=a[d];if(Array.prototype.indexOf)-1==b.dataDefinitionIds.indexOf(c)&&b.dataDefinitionIds.push(c);else{for(var h=!1,f=b.dataDefinitionIds.length,g=0;g<f;g++)if(b.dataDefinitionIds[g]===c){h=!0;break}h||b.dataDefinitionIds.push(c)}}b.pageSpecificDataDefinitionsSet=
!0;p()};b.DataDefinition=function(a,b){this.id=a;this.registrationFn=b;this.endRegistrationTime=this.startRegistrationTime=null;this.startRegistration=function(){this.startRegistrationTime=new Date};this.endRegistration=function(){this.endRegistrationTime=new Date}};b.registerDataDefinition=function(a,e){var d=b.dataDefinitions[e];d||(d=new b.DataDefinition(e,a),b.dataDefinitions[e]=d);d.startRegistrationTime||(d.startRegistration(),d.registrationFn(),d.endRegistration());b.pageSpecificDataDefinitionsSet&&
p()};b.callOnDataDefintionComplete=function(){b.executionState.dataDefinitionComplete=!0;b.testAll()};b.callOnDOMParsed=function(){window[ensightenOptions.ns].executionState.DOMParsed=!0;window[ensightenOptions.ns].testAll()};b.callOnDOMLoaded=function(){window[ensightenOptions.ns].executionState.DOMParsed=!0;window[ensightenOptions.ns].executionState.DOMLoaded=!0;window[ensightenOptions.ns].testAll()};b.callOnPageSpecificCompletion=function(){for(var a=document.getElementsByTagName("script"),b=0,
d=a.length;b<d;b++)if(a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i)&&"loaded"!=a[b].readyState&&"complete"!=a[b].readyState){setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion,50);return}setTimeout(function(){window[ensightenOptions.ns].executionState.conditionalRules=!0;window[ensightenOptions.ns].testAll()},1)};b.callOnGetServerComponent=function(){window[ensightenOptions.ns].executionState.readyForServerComponent=!0;window[ensightenOptions.ns].testAll()};b.hasDOMParsed=
function(){return window[ensightenOptions.ns].executionState.DOMParsed};b.hasDOMLoaded=function(){return window[ensightenOptions.ns].executionState.DOMLoaded};b.hasPageSpecificCompletion=function(){return window[ensightenOptions.ns].executionState.conditionalRules};var q=function(){var a=[],b=!1,d=!1;return{add:function(c){b&&!d?c():"function"==typeof c&&(a[a.length]=c)},exec:function(){d=!0;do{var c=a;a=[];b=!0;for(var g=0;g<c.length;g++)try{c[g].call(window)}catch(f){window[ensightenOptions.ns].reportException(f)}}while(0<
a.length);d=!1},haveRun:function(){return b}}};b.new_fArray=function(){return q()};c.timer=null;(function(){function a(a,b){return function(){a.apply(b,arguments)}}window.console||(window.console={});var b=window.console;if(!b.log)if(window.log4javascript){var c=log4javascript.getDefaultLogger();b.log=a(c.info,c);b.debug=a(c.debug,c);b.info=a(c.info,c);b.warn=a(c.warn,c);b.error=a(c.error,c)}else b.log=function(){};b.debug||(b.debug=b.log);b.info||(b.info=b.log);b.warn||(b.warn=b.log);b.error||(b.error=
b.log)})();document.addEventListener?(-1<navigator.userAgent.indexOf("AppleWebKit/")?c.timer=window.setInterval(function(){/loaded|complete/.test(document.readyState)&&(clearInterval(c.timer),b.callOnDOMParsed())},50):document.addEventListener("DOMContentLoaded",b.callOnDOMParsed,!1),window.addEventListener("load",b.callOnDOMLoaded,!1)):(setTimeout(function(){var a=window.document;(function(){try{if(!document.body)throw"continue";a.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,
15);return}window[ensightenOptions.ns].callOnDOMParsed()})()},1),window.attachEvent("onload",function(){window[ensightenOptions.ns].callOnDOMLoaded()}));"true"===c.options.enableTagAuditBeacon&&b.sampleBeacon()&&window.setTimeout(function(){try{for(var a=[],e,d,l,h,f=0;f<c.ruleList.length;++f)d=c.ruleList[f],l=d.executionData.hasRun?"1":"0",h=d.deploymentId.toString()+"|"+d.id.toString()+"|"+l,a.push(h);e="["+a.join(";")+"]";b.imageRequest(window.location.protocol+"//"+c.nexus+"/"+g.client+"/"+g.publishPath+
"/TagAuditBeacon.rnc?cid="+g.clientId+"&data="+e+"&idx=0&r="+c.rand)}catch(m){b.currentRuleId=-1,b.currentDeploymentId=-1,a=new c.BeaconException(m),window[ensightenOptions.ns].reportException(a)}},3E3);window.setInterval(b.testAll,c.options.interval);return b}(ensightenOptions);
"true"===ensightenOptions.enablePagePerfBeacon&&window[ensightenOptions.ns].sampleBeacon()&&window[ensightenOptions.ns].bindDOMParsed(function(){var g=window.performance;if(g){var g=g.timing||{},m="",n=g.navigationStart||0,p,c={connectEnd:"ce",connectStart:"cs",domComplete:"dc",domContentLoadedEventEnd:"dclee",domContentLoadedEventStart:"dcles",domInteractive:"di",domLoading:"dl",domainLookupEnd:"dle",domainLookupStart:"dls",fetchStart:"fs",loadEventEnd:"lee",loadEventStart:"les",redirectEnd:"rede",
redirectStart:"reds",requestStart:"reqs",responseStart:"resps",responseEnd:"respe",secureConnectionStart:"scs",unloadEventStart:"ues",unloadEventEnd:"uee"},m="&ns="+g.navigationStart,b;for(b in c)void 0!==g[b]?(p=g[b]-n,m+="&"+c[b]+"="+(0<p?p:0)):m+="&"+c[b]+"=-1";window[ensightenOptions.ns].timing=m;b=ensightenOptions.nexus||"nexus.ensighten.com";g=ensightenOptions.staticJavascriptPath||"";m=g.indexOf(".com/");n=g.indexOf("/code/");g=g.substring(m+4,n)+"/perf.rnc";g+="?cid="+ensightenOptions.clientId+
window[ensightenOptions.ns].timing;window[ensightenOptions.ns].imageRequest("//"+b+g)}});
	Bootstrapper.dataDefinitionIds = [];Bootstrapper.getServerComponent(Bootstrapper.getExtraParams ? Bootstrapper.getExtraParams() : undefined);}})();