import type { Module as IModule, Store } from "../vanilla";
export interface ModuleProps<S, A> {
  use: IModule<S, A>;
}
interface Props<S, A> extends ModuleProps<S, A> {
  Store: Store<S, A>;
}

export function Module<S, A>({ use, Store }: Props<S, A>) {
  Store.use(use);

  return null;
}
