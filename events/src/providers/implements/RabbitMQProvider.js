"use strict";
exports.__esModule = true;
exports.RabbitMQProvider = void 0;
var RabbitMQProvider = /** @class */ (function () {
    function RabbitMQProvider() {
    }
    RabbitMQProvider.prototype.subscriptionOnEvent = function (onCallback) {
        throw new Error('Method not implemented.');
    };
    RabbitMQProvider.prototype.publishEvent = function (eventName, message) {
        throw new Error('Method not implemented.');
    };
    return RabbitMQProvider;
}());
exports.RabbitMQProvider = RabbitMQProvider;
