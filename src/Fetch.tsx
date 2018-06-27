import * as React from "react";
import { Fragment, Component, ReactNode, ComponentClass } from "react";

export type FetchType = (options: any) => any | Promise<any>;

type FetchStateType = {
  fetch: FetchType;
  data: any;
  error: any;
  loading: boolean;
};

export type FetchPropsType = {
  fetch: FetchType;
  options?: any;
  then?: (
    req: {
      fetch: FetchType;
      options?: any;
      data?: any;
      error?: any;
    }
  ) => any;
  children: (result: FetchStateType) => ReactNode;
};

export class Fetch extends Component<FetchPropsType, FetchStateType> {
  data: any;
  data_promise: any | Promise<any>;
  static defaultProps = {
    keep: true
  };
  constructor(props) {
    super(props);
    this.state = this.receiveProps(props);
  }
  componentWillUnmount() {
    this.data_promise = null;
  }
  receiveProps(props) {
    let data, error, loading;
    const { fetch, options, then, skip } = props;
    if (!skip) {
      loading = true;
      let data_promise = fetch(options);
      if (!data_promise || typeof data_promise.then !== "function") {
        loading = false;
        data = data_promise;
        data_promise = Promise.resolve(data_promise);
      }
      this.data_promise = data_promise;
      data_promise.then(
        data => {
          then && then({ fetch, options, data, error: null });
          if (this.data_promise === data_promise) {
            this.setState({ data, error: null, loading: false });
          }
        },
        error => {
          then && then({ fetch, options, data: null, error });
          if (this.data_promise === data_promise) {
            this.setState({ error, loading: false });
          }
        }
      );
    }
    return { data, error, loading, fetch };
  }
  componentWillReceiveProps(nextProps) {
    const new_state = this.receiveProps(nextProps);
    if (nextProps.keep) {
      new_state.data === undefined && delete new_state.data;
      new_state.error === undefined && delete new_state.error;
      // new_state.fetch === undefined && delete new_state.fetch;
      // new_state.loading === undefined && delete new_state.loading;
    }
    this.setState(new_state);
  }
  render() {
    return this.props.children(this.state);
  }
}

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
