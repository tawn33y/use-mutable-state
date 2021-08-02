"use strict";
var useMutableState = function (initialValue) {
    var value = initialValue;
    var callbackFunction = function () { };
    return {
        get: function () { return value; },
        set: function (newValue) {
            value = newValue;
            callbackFunction(value);
        },
        onChange: function (newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
    };
};