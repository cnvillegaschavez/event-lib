const config = {
  aws: {
    region: process.env.EVENT_AWS_REGION,
    accessKeyId: process.env.EVENT_AWS_ACCESS_KEY_ID || null,
    secretAccessKey: process.env.EVENT_AWS_SECRET_ACCESS_KEY || null,
  },
};

export default config;
