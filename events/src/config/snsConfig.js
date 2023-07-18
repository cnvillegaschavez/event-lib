"use strict";
exports.__esModule = true;
var snsConfig = {
    topicArn: process.env.EVENT_PUBLISH_CONNECT_STRING,
    sourceName: process.env.SOURCE_NAME
};
exports["default"] = snsConfig;
