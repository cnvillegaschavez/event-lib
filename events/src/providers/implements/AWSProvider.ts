import { config, snsConfig, sqsConfig } from '../../config';
import * as AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import { IBrokerProvider } from '../IBrokerProvider';

export class AWSProvider implements IBrokerProvider {
  
  constructor() {
    if (!config.aws.region) {
      throw new Error('configuration AWS REGION');
    }
    AWS.config.update({ region: config.aws.region });
  }

  private isValidSnsConfig() {
    if (!snsConfig.topicArn) {
      throw new Error('configuration sns incomplete');
    }
   
  }

  publishEvent(eventName: string, message: string): Promise<any> | void {
    this.isValidSnsConfig();
    const instanceSNS = new AWS.SNS();

    const params = {
      MessageAttributes: {
        sourceName: {
          DataType: 'String',
          StringValue: snsConfig.sourceName,
        },
        eventName: {
          DataType: 'String',
          StringValue: eventName,
        },
      },
      Subject: eventName,
      Message: message,
      TopicArn: snsConfig.topicArn,
    };

    return instanceSNS.publish(params).promise();
  }

  subscriptionOnEvent(onCallback: (error: any, data: any) => void): Promise<any> | void {
    if (!sqsConfig.sqsUrl) {
      throw new Error(`configuration EVENT_CONNECT_STRING incomplete ${sqsConfig}`);
    }

    const consumer = Consumer.create({
      queueUrl: sqsConfig.sqsUrl,
      handleMessage: async (message: any) => {
        try {
          // Limpiamos el resultado de la libreria
          const messageBody = await this.clearMessage(JSON.parse(message.Body));
          // Realizamos el llamos al callback
          onCallback(null,messageBody);
        } catch (error) {
          onCallback(error, message);
        }
      },
      batchSize: sqsConfig.iterations as number,
      attributeNames: sqsConfig.sourceNames.split(','),
      visibilityTimeout: sqsConfig.visibilityTimeout as number,
      sqs: new AWS.SQS(),
    });
    // TODO: Evaluar llas instanciass por cola e un solo timer
    consumer.start();
  }

  private validJSON = (cadena: string) => {
    return new Promise((resolve, reject) => resolve(JSON.parse(cadena)));
  };

  private async clearMessage(body: any) {
    return await this.validJSON(body.Message)
      .then((messageJson: any) => {
        return messageJson;
      })
      .catch((eror) => {
        return body.Message;
      });
  }
}
