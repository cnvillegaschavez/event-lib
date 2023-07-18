import { BaseResource } from './providers/BaseResource';
import { IBrokerProvider } from './providers/IBrokerProvider';

export class EventBus extends BaseResource {
  private provider: IBrokerProvider;
  constructor() {
    super();
    this.provider = this.generateProvider();
  }

  public publishEvent(eventName: string, message: string): void | Promise<any> {
    return this.provider.publishEvent(eventName, message);
  }
}
