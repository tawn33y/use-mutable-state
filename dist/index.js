"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutableState = function (initialValue) {
    if (initialValue === void 0) { initialValue = null; }
    var value = initialValue;
    var $cb = function () { };
    return {
        onChange: function (cb) {
            $cb = cb;
        },
        get: function () { return value; },
        set: function (newValue) {
            value = newValue;
            $cb(value);
        },
    };
};
//# sourceMappingURL=index.js.map