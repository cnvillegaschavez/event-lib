import { IBrokerProvider } from '../IBrokerProvider';

export class RabbitMQProvider implements IBrokerProvider {
  subscriptionOnEvent(onCallback: (error: any, data: any) => void): void | Promise<any> {
    throw new Error('Method not implemented.');
  }
  publishEvent(eventName: string, message: string): void | Promise<any> {
    throw new Error('Method not implemented.');
  }
}
