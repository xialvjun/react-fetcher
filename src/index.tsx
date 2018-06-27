import * as React from "react";
import { Fragment, Component, ReactNode, ComponentClass } from "react";

import { Fetch as OriginFetch, FetchType, FetchPropsType } from "./Fetch";

export function createFetcher() {
  const Context = React.createContext<FetchType>(null);

  const Provider = ({
    fetch,
    children
  }: {
    fetch: FetchType;
    children: ReactNode;
  }) => <Context.Provider value={fetch}>{children}</Context.Provider>;

  const Consumer = (
    props: Pick<FetchPropsType, "options" | "then" | "children"> & {
      fetch?: (options: any, ctx_fetch: FetchType) => any | Promise<any>;
    }
  ) => (
    <Context.Consumer>
      {ctx_fetch => {
        const props_fetch =
          props.fetch || ((opts, ctx_fetch) => ctx_fetch(opts));
        const fetch = otps => props_fetch(otps, ctx_fetch);
        return <OriginFetch {...{ ...props, fetch }} />;
      }}
    </Context.Consumer>
  );

  return { Fetcher: Provider, Fetch: Consumer };
}

const fetcher = createFetcher();
const { Fetcher, Fetch } = fetcher;

export default fetcher;

export { Fetcher, Fetch };
