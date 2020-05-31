'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  users: function users(parent, args, _ref, info) {
    var prisma = _ref.prisma;

    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts: function posts(parent, args, _ref2, info) {
    var prisma = _ref2.prisma;

    var opArgs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments: function comments(parent, args, _ref3, info) {
    var prisma = _ref3.prisma;

    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    return prisma.query.comments(opArgs, info);
  },
  me: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref4, info) {
      var prisma = _ref4.prisma,
          request = _ref4.request;
      var userId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);
              return _context.abrupt('return', prisma.query.user({
                where: {
                  id: userId
                }
              }));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function me(_x, _x2, _x3, _x4) {
      return _ref5.apply(this, arguments);
    }

    return me;
  }(),
  post: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref6, info) {
      var prisma = _ref6.prisma,
          request = _ref6.request;
      var userId, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = (0, _getUserId2.default)(request, false);
              _context2.next = 3;
              return prisma.query.posts({
                where: {
                  id: args.id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: userId
                    }
                  }]
                }
              }, info);

            case 3:
              posts = _context2.sent;

              if (!(posts.length === 0)) {
                _context2.next = 6;
                break;
              }

              throw new Error('Post not found');

            case 6:
              return _context2.abrupt('return', posts[0]);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function post(_x5, _x6, _x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return post;
  }(),
  myPosts: function myPosts(parent, args, _ref8, info) {
    var prisma = _ref8.prisma,
        request = _ref8.request;

    var userId = (0, _getUserId2.default)(request);

    var opArgs = {
      where: {
        author: {
          id: userId
        }
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }

    return prisma.query.posts(opArgs, info);
  }
};

exports.default = Query;