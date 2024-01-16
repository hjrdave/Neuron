import type { Module as IModule, Store } from "../vanilla";
export interface ModuleProps {
  use: IModule;
}
interface Props<S = { [key: string]: unknown }> extends ModuleProps {
  Store: Store<S>;
}

export function Module<S = { [key: string]: unknown }>({
  use,
  Store,
}: Props<S>) {
  Store.use(use);

  return null;
}
