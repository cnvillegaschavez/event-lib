const sqsConfig = {
  overdueTransactionTimeInSEC: process.env.EVENT_OVERDUE_TRANSACTION_TIME_SEC || 86400,
  delay: process.env.EVENT_SQS_DELAY || 0,
  sqsUrl: process.env.EVENT_SUBSCRIBE_CONNECT_STRING,
  iterations: process.env.EVENT_SQS_ITERATIONS || 10,
  visibilityTimeout: process.env.EVENT_VISIBILITY_TIME_OUT || 30,
  messageAttributeNames: process.env.EVENT_MSNATTRIBUTE_NAMES || 'All',
  sourceNames: process.env.EVENT_FILTER_SOURCE || 'All'
};

export default sqsConfig;
