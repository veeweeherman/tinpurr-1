var _ = require("lodash");
var http = require("http");
var url = require("url");
var api = require("./api_info.js");

var PETFINDER_KEY = api.apiKey;

// INTERACTIONS
function petfinder(key) {
  var self = this;
  self.KEY = key;
  self._httpOptions = function (opts) {
    var defaultOpts = {
      "protocol": "http:",
      "host": "api.petfinder.com",
      "query": {
        "format": "json",
        "key": self.KEY
      }
    };
    _.defaults(defaultOpts.query, opts.query);
    _.defaults(defaultOpts, opts);
    return defaultOpts;
  };

  self._httpGet = function (opts, callback) {
    var uri = url.format(opts);
    http.get(uri, function (res) {
      var data = "";
      res.on("data", function (chunk) {
        data += chunk.toString();
      });
      res.on("end", function () {
        callback(JSON.parse(data));
      });
    });
  };

  self.pet = {
    find: function (location, opts, callback) {
      var options = self._httpOptions({
        "pathname": "/pet.find",
        "query": {
          "animal": "cat",
          "location": location
        }
      });

      opts = opts || {};

      _.extend(options.query, opts);
      self._httpGet(options, callback);
    },

    get: function (id, callback) {
      var options = self._httpOptions({
        "pathname": "/pet.get",
        "query": {
          "id": id
        }
      });
      self._httpGet(options, callback);
    },
    getCats: function (location, opts, callback) {
      var options = self._httpOptions({
        "pathname": "/pet.getRandom",
        "query": {
          "animal": "cat",
          "output": "basic",
          "location": location
        }
      });
      opts = opts || {};

      _.extend(options.query, opts);
        self._httpGet(options, callback);
      }
  };
}

var getAvatar = function(data){
  if(data.media && data.media.photos){
    var avatar = data.media.photos.photo[1].$t;
    return avatar.substring(0, avatar.length - 11) + "500&-x.jpg";
  } else {
    return "";
  }
};

var info = function (data) {
  console.log("\t[%d] %s/%s/%s/\t%s", data.id.$t, data.name.$t, data.sex.$t, data.age.$t, getAvatar(data));
};

var infopage = function(data){
  data = data.petfinder.pet;
  console.log(
    getAvatar(data),
    data
  ); 
};

// TESTS
var pf = new petfinder(PETFINDER_KEY);

pf.pet.getCats(94523, {"count":10}, function(data){
  console.log(data.petfinder.pet.forEach(info));
});

pf.pet.get(33004187, infopage);


