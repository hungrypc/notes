'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = function getUserId(request) {
  var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (header) {
    var token = header.replace('Bearer ', '');
    var decoded = _jsonwebtoken2.default.verify(token, 'token_secret');
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null;
};

exports.default = getUserId;