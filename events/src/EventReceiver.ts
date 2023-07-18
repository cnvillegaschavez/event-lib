import { BaseResource } from './providers/BaseResource';
import { IBrokerProvider } from './providers/IBrokerProvider';

export class EventReceiver extends BaseResource {
  private provider: IBrokerProvider;

  constructor() {
    super();
    this.provider = this.generateProvider();
  }

  public onSubscribeEvent(onCallback: (error: any, data: any) => void): Promise<any> | void {
    this.provider.subscriptionOnEvent(onCallback);
  }
}
