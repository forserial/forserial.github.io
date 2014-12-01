(function () {
  define('consonance', ['consonance_core'], function (core) {
    var stack = [], mic = null;

    function _consonance(a) {
        // doesn't do anything yet. This is where a would get a bunch of stuff
        // applied to it.
        return a;
    }

    function consonance(a) {
        stack = [], consonance._context = null;
        if (a !== null) consonance._context = a;
        return _consonance(a);
    }

    consonance.context = function context() {
        return core.context;
    }

    consonance.mic = function (cb, err) {
        var self = this;
        err = err || function () {};

        function callback() {
            return cb.apply(self, arguments);
        }

        function errback() {
            return err.apply(self, arguments);
        }

        if (mic === null) {
            core.getUserMedia({
                    "audio": true
                }, callback, errback);
        }
    }

    return window.consonance = consonance;
  });
}());
