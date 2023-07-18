export interface IBrokerProvider {
  subscriptionOnEvent(onCallback: (error: any, data: any) => void): Promise<any> | void;
  publishEvent(eventName: string, message: string): Promise<any> | void;
}
