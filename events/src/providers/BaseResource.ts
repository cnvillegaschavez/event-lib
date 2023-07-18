import { IBrokerProvider } from './IBrokerProvider';
import Options from '../models/broker.model';
import { AWSProvider } from './implements/AWSProvider';
import { RabbitMQProvider } from './implements/RabbitMQProvider';

export class BaseResource {
  providerName: Options;
  constructor() {
    this.providerName = (process.env.PROVIDER || '').trim() as Options;
  }

  generateProvider(): IBrokerProvider {
    
    switch (this.providerName) {
      case Options.ByRabbitMQ:
        return new RabbitMQProvider();
      case Options.ByAWS:
        return new AWSProvider();
      default:
        throw new Error('Provider not implement');
    }
  }
}
