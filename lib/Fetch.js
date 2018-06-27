"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Fetch = /** @class */ (function (_super) {
    __extends(Fetch, _super);
    function Fetch(props) {
        var _this = _super.call(this, props) || this;
        _this.state = _this.receiveProps(props);
        return _this;
    }
    Fetch.prototype.componentWillUnmount = function () {
        this.data_promise = null;
    };
    Fetch.prototype.receiveProps = function (props) {
        var _this = this;
        var data, error, loading;
        var fetch = props.fetch, options = props.options, then = props.then, skip = props.skip;
        if (!skip) {
            loading = true;
            var data_promise_1 = fetch(options);
            if (!data_promise_1 || typeof data_promise_1.then !== "function") {
                loading = false;
                data = data_promise_1;
                data_promise_1 = Promise.resolve(data_promise_1);
            }
            this.data_promise = data_promise_1;
            data_promise_1.then(function (data) {
                then && then({ fetch: fetch, options: options, data: data, error: null });
                if (_this.data_promise === data_promise_1) {
                    _this.setState({ data: data, error: null, loading: false });
                }
            }, function (error) {
                then && then({ fetch: fetch, options: options, data: null, error: error });
                if (_this.data_promise === data_promise_1) {
                    _this.setState({ error: error, loading: false });
                }
            });
        }
        return { data: data, error: error, loading: loading, fetch: fetch };
    };
    Fetch.prototype.componentWillReceiveProps = function (nextProps) {
        var new_state = this.receiveProps(nextProps);
        if (nextProps.keep) {
            new_state.data === undefined && delete new_state.data;
            new_state.error === undefined && delete new_state.error;
            // new_state.fetch === undefined && delete new_state.fetch;
            // new_state.loading === undefined && delete new_state.loading;
        }
        this.setState(new_state);
    };
    Fetch.prototype.render = function () {
        return this.props.children(this.state);
    };
    Fetch.defaultProps = {
        keep: true
    };
    return Fetch;
}(react_1.Component));
exports.Fetch = Fetch;
// class LifeCycle extends Component {
// }
// const lifecycle = <LifeCycle props={0} constructor={(props, ctx, ins) => ins} getDerivedStateFromProps={(np, pp) => npv || ppv} render={ins => ins} componentDidMount={ins => ins} shouldComponentUpdate={(np, ns,ins) => true} getSnapshotBeforeUpdate={(a)=>a}></LifeCycle>
// class GetDerivedStateFromProps<T = any> extends Component<
//   { value: T; merge: (npv: T, ppv: T) => T; children: (v: T) => ReactNode },
//   { value: T }
// > {
//   state = { value: null };
//   static getDerivedStateFromProps(nextProps, prevState) {
//     return { value: nextProps.merge(nextProps.value, prevState.value) };
//   }
//   render() {
//     return this.props.children(this.state.value);
//   }
// }
// function FFetch(p) {
//   const { children, ...rest } = p;
//   return (
//     <Fetch {...rest}>
//       {s => (
//         <GetDerivedStateFromProps
//           value={s}
//           merge={(npv, ppv) => ({
//             // keep ppv.data/error if npv.data/error === undefined for better UserExperience
//             data: npv.data !== undefined ? npv.data : ppv.data,
//             error: npv.error !== undefined ? npv.error : ppv.error,
//             fetch: npv.fetch,
//             loading: npv.loading,
//           })}
//         >
//           {children}
//         </GetDerivedStateFromProps>
//       )}
//     </Fetch>
//   );
// }
