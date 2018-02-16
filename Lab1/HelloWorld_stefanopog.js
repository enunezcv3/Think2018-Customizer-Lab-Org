if(typeof(dojo) != "undefined") {
	require(["dojo/domReady!"], function(){
        try {
          var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                          if (!elXpathRoot) var elXpathRoot = dojo.body();
                          if (!maxInter) var maxInter = 10000;  // number of intervals before expiring
                          if (!waitTime) var waitTime = 1;  // 1000=1 second
                          if (!elXpath) return;
                          var waitInter = 0;  // current interval
                          var intId = setInterval( function(){
                              if ( ++waitInter < maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

                              clearInterval(intId);
                              if (waitInter >= maxInter) { 
                                  console.log("**** WAITFOR [" + elXpath + "] WATCH EXPIRED!!! interval " + waitInter + " (max:" + maxInter + ")");
                              } else {
                                  console.log("**** WAITFOR [" + elXpath + "] WATCH TRIPPED AT interval " + waitInter + " (max:" + maxInter + ")");
                                  callback();
                              }
                          }, waitTime);
          };
          waitFor(function(){
                    //
                    //  Change the Greetings string
                    //  Note that the username of the currently Logged in user can be obtained by means of the
                    //  global variable "lconn.homepage.userName". This variable is defined by the 
                    //  IBM Connections Home page
                    //
                    dojo.query("span.shareSome-title")[0].textContent = "Hello " + lconn.homepage.userName + " -";
                    //
                    // Change the Description
                    //
                    var updatesDescription = document.getElementById("asDesc");
                    var originalText = updatesDescription.textContent;
                    updatesDescription.textContent = "Hello Customizer: " + originalText;
                    updatesDescription.style = "color:#ff0000";
          }, ".lotusStreamTopLoading div.loaderMain.lotusHidden");
      } catch(e) {
          alert("Exception occurred in helloWorld: " + e);
      }
   });
}
