'use strict';

var clean = require('../');
var node_path = require('path');
var node_fs = require('fs');


function remote_check_username(value, callback) {

  // Ha, this is a pointless async method
  process.nextTick(function() {
    callback(value === 'guest' ? null : 'Username already taken!!');
  });
}

function md5(string) {
  return string + 'fake0md50blah00hahahaha=.=';
}

function print_result(err, results) {

  // There are always errors due to our fake `remote_check_username`, hahahaha
  if (err) {
    console.log('Error!', err.message || err);
    return;
  }

  console.log('\nThe parsed result is', results);
}

var c = clean({
  schema: {
    username: {
      required: true,

      // async validator
      validate: function(value) {
        var done = this.async();

        remote_check_username(value, function(err) {
          done(err);
        });
      }
    },

    password: {
      set: function(value) {
        // get the value of another property
        var username = this.get('username');
        var done = this.async();

        // guests are welcome without passwords
        if (value || username === 'guest') {
          // define a new 
          done(null, md5(value || '123456'));

        } else {
          done('Please input your password, or use "guest" account instead.');
        }
      }
    },

    cwd: {
      default: process.cwd(),
      type: node_path,

      // this is a sync validator
      validate: function(value, is_default) {
        var pkg = node_path.resolve(value, 'package.json');

        if (!node_fs.existsSync(pkg)) {
          return false;
        }
      }
    }
  }
});

c.clean({
  username: 'abc',
  password: ''

}, function(err, results) {
  console.log('\n\nclean a given object:');

  print_result(err, results);
});


c.parse(process.argv, function(err, results) {
  console.log('\n\nparse the current argv:');

  print_result(err, results);
})