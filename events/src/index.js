"use strict";
exports.__esModule = true;
exports.subscribeMessage = exports.publishMessage = void 0;
var dotenv = require("dotenv");
dotenv.config();
var EventBus_1 = require("./EventBus");
var EventReceiver_1 = require("./EventReceiver");
var publishMessage = function (eventName, message) {
    var eventBus = new EventBus_1.EventBus();
    return eventBus.publishEvent(eventName, message);
};
exports.publishMessage = publishMessage;
var subscribeMessage = function (onCallback) {
    var eventReceiver = new EventReceiver_1.EventReceiver();
    eventReceiver.onSubscribeEvent(onCallback);
};
exports.subscribeMessage = subscribeMessage;
