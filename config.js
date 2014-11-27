System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "forserial.org/*": "dist/*.js"
  },
  "bundles": {
    "build": [
      "github:components/jquery@2.1.1/jquery.min",
      "github:julianshapiro/blast@1.1.1/jquery.blast",
      "github:components/jquery@2.1.1",
      "main"
    ]
  }
});

System.config({
  "map": {
    "blast": "github:julianshapiro/blast@^1.1.1",
    "github:consonance": "github:rzyns/consonance@master",
    "github:julianshapiro/blast": "github:julianshapiro/blast@^1.1.1",
    "github:rzyns/consonance": "github:rzyns/consonance@master",
    "github:rzyns/webaudiox": "github:rzyns/webaudiox@jspm",
    "jquery": "github:components/jquery@^2.1.1",
    "webaudiox": "github:rzyns/webaudiox@jspm"
  }
});

System.config({
  "versions": {
    "github:components/jquery": "2.1.1",
    "github:consonance": "master",
    "github:julianshapiro/blast": "1.1.1",
    "github:rzyns/consonance": "master",
    "github:rzyns/webaudiox": "jspm"
  }
});

