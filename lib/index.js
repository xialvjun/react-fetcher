"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Fetch_1 = require("./Fetch");
function createFetcher() {
    var Context = React.createContext(null);
    var Provider = function (_a) {
        var fetch = _a.fetch, children = _a.children;
        return React.createElement(Context.Provider, { value: fetch }, children);
    };
    var Consumer = function (props) { return (React.createElement(Context.Consumer, null, function (ctx_fetch) {
        var props_fetch = props.fetch || (function (opts, ctx_fetch) { return ctx_fetch(opts); });
        var fetch = function (otps) { return props_fetch(otps, ctx_fetch); };
        return React.createElement(Fetch_1.Fetch, __assign({}, __assign({}, props, { fetch: fetch })));
    })); };
    return { Fetcher: Provider, Fetch: Consumer };
}
exports.createFetcher = createFetcher;
var fetcher = createFetcher();
var Fetcher = fetcher.Fetcher, Fetch = fetcher.Fetch;
exports.Fetcher = Fetcher;
exports.Fetch = Fetch;
exports.default = fetcher;
