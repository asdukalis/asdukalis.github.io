(function() {
  var assert, delay, now;

  assert = require("assert");

  delay = function(ms, fn) {
    return setTimeout(fn, ms);
  };

  now = void 0;

  describe("now", function() {
    it("initially gives a near zero (< 20 ms) time ", function() {
      now = require("../");
      return assert(now() < 20);
    });
    it("gives a positive time", function() {
      return assert(now() > 0);
    });
    it("two subsequent calls return an increasing number", function() {
      var a, b;
      a = now();
      b = now();
      return assert(now() < now());
    });
    it("has less than 10 microseconds overhead", function() {
      return Math.abs(now() - now()) < 0.010;
    });
    it("can do 1,000,000 calls really quickly", function() {
      var i, j, results;
      results = [];
      for (i = j = 0; j < 1000000; i = ++j) {
        results.push(now());
      }
      return results;
    });
    it("shows that at least 990 ms has passed after a timeout of 1 second", function(done) {
      var a;
      a = now();
      return delay(1000, function() {
        var b, diff;
        b = now();
        diff = b - a;
        if (diff < 990) {
          return done(new Error("Diff (" + diff + ") lower than 990."));
        }
        return done(null);
      });
    });
    return it("shows that not more than 1020 ms has passed after a timeout of 1 second", function(done) {
      var a;
      a = now();
      return delay(1000, function() {
        var b, diff;
        b = now();
        diff = b - a;
        if (diff > 1020) {
          return done(new Error("Diff (" + diff + ") higher than 1020."));
        }
        return done(null);
      });
    });
  });

}).call(this);
