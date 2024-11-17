import { IModule, IPayload, ModuleOptions } from "./Interfaces";

export class Module implements IModule {
  readonly name: string;
  private featureInit?: any;
  private featureOnRun?: any;
  private featureOnCallback?: any;

  readonly onInit = (payload: IPayload<unknown>) => this.featureInit?.(payload);
  readonly onRun = (payload: IPayload<unknown>) => this.featureOnRun?.(payload);
  readonly onCallback = (payload: IPayload<unknown>) =>
    this.featureOnCallback?.(payload);

  constructor(options: ModuleOptions) {
    this.name = options.name;
    this.featureInit = options.onInit;
    this.featureOnRun = options.onRun;
    this.featureOnCallback = options.onCallback;
  }
}
