import { publishMessage } from '../src';
jest.mock('../src/EventBus'); //TODO comment for test live listener

describe('Checking if the factory returns emit and receive messages', () => {
  describe('extending from "EventSourced" to create a "EventMessageSend"', () => {
    it('should be possible to persist another event into SNS', async () => {

      const messageBody = '{ "body": { "dni": "46046448", "name":"Cristian"} }'
      const eventName = 'client-onboarding';
      const response = await publishMessage(eventName, messageBody);
      console.log('response', response);
    });
  });
});
