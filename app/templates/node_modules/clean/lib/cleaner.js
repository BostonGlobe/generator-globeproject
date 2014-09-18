'use strict';

module.exports = Cleaner;

var skema = require('skema');
var types = require('./types');

function Cleaner (rule, context, name) {
  rule = this._parse_rule(rule);
  this.skema = skema({
    rule: rule,
    context: context
  });
  this.name = name;
}


// Validate and apply setters.
Cleaner.prototype.clean = function(value, args, callback) {
  var skema = this.skema;
  skema.validate(value, args, function (err) {
    if (err) {
      return callback(err);
    }

    skema.set(value, args, callback);
  });
};


// @param {Object} rule
// - default: 
// - required
// - validate:
// - set
// - type
Cleaner.prototype._parse_rule = function(rule) {
  var parsed = skema.parse(rule);

  if (rule.type) {
    var type = this._get_type(rule.type);
    type.validate && parsed.validate.unshift(type.validate);
    type.set && parsed.set.unshift(type.set);
  }

  // if required is defined, ignore `rule.default`
  if (rule.required) {
    parsed.validate.unshift(required);

  } else if ('default' in rule) {
    var set_default = typeof rule.default === 'function'
      ? rule.default
      : function (value, is_default) {
        return is_default
          ? rule.default
          : value; 
      };
    parsed.set.unshift(set_default);
  }

  return parsed;
};


function required (value, is_default) {
  var done = this.async();

  if (is_default) {
    done(new TypeError('Required, must be specified.'));

  } else {
    done(null);
  }
};


Cleaner.prototype._get_type = function(type) {
  var type_def = types.get(type);

  if (Object(type_def) !== type_def) {
    throw new Error('invalid type definition "' + type + '" for argument "' + this.name + '".');
  }

  return type_def;
};
