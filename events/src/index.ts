import * as dotenv from 'dotenv';
dotenv.config();

import { EventBus } from './EventBus';
import { EventReceiver } from './EventReceiver';

const publishMessage = (eventName: string, message: string) => {
  const eventBus = new EventBus();
  return eventBus.publishEvent(eventName, message);
};

const subscribeMessage = (onCallback: (error: any, data: any) => void): void => {
  const eventReceiver = new EventReceiver();
  eventReceiver.onSubscribeEvent(onCallback);
};

export { publishMessage, subscribeMessage };
