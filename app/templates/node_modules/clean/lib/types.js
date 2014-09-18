'use strict';

var types = exports;

var node_path = require('path');
var node_url = require('url');

types.get = get_type;

function get_type (type, types) {
  if (typeof type === 'string') {
    type = type.toLowerCase();
    var rule = types && types[type] || TYPES[type];

    // type.get('string')
    if (rule) {
      return rule;
    }
  }

  var key;
  var def;

  // type.get(String)
  for (key in TYPES) {
    def = TYPES[key];

    if (type === def.type) {
      return def;
    }
  }

  return;
};


var TYPES = types.TYPES = {
  string: {
    type: String,
    set: function(value, is_default) {
      if (is_default) {
        return value || '';
      }

      return String(value);
    }
  },

  number: {
    type: Number,
    validate: function(value, is_default) {
      var done = this.async();
      if (is_default && value === undefined) {
        return done(null, 0);
      }

      if (isNaN(value)) {
        return done(new TypeError('Must be a number.'));
      }

      done(null, 0);
    },
    set: function(value) {
      return Number(value);
    }
  },

  boolean: {
    type: Boolean,
    set: function(value, is_default) {
      if (typeof value === 'boolean') {
        return value;
      }

      if (is_default && value === undefined) {
        return false;
      }

      if (value === 'null' || value === 'false') {
        return false;
      }

      if (!isNaN(value)) {
        return !!(+ value);
      }

      return true;
    }
  },

  date: {
    type: Date,
    set: function(value, is_default) {
      if (is_default && value === undefined) {
        return;
      }

      // already is
      if (value instanceof Date) {
        return value;
      }

      var done = this.async();
      var date = Date.parse(value);
      if (isNaN(date)) {
        done(new TypeError('"' + value + '" is not a valid date.'));

      } else {
        done(null, new Date(value));
      }
    }
  },

  url: {
    type: node_url,
    set: function(value, is_default) {
      var done = this.async();

      // There might be other filters ahead of `types.url.set`
      if (is_default && value === undefined) {
        return done(null);
      }

      // if the parameter is not string, an error occurs
      var url = node_url.parse(String(value));

      if (!url.host) {
        done(new TypeError('"' + value + '" is not a valid url.'));

      } else {
        done(null, url.href);
      }
    }
  },

  path: {
    type: node_path,
    set: function(value, is_default) {
      // we should not convert `undefined` to some path like `/Users/xxx/undefined`
      if (is_default && value === undefined) {
        return;
      } else {
        return node_path.resolve(String(value));
      }
    }
  }
};
