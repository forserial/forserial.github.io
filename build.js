"format register";

System.register("main", [], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, []);
  (function() {  console.log("We're in main");
      
  }).call(System.global);  return System.get("@@global-helpers").retrieveGlobal(__module.id, false);
});
