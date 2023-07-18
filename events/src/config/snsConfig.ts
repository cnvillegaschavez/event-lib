const snsConfig = {
  topicArn: process.env.EVENT_PUBLISH_CONNECT_STRING,
  sourceName: process.env.SOURCE_NAME,
};

export default snsConfig;
