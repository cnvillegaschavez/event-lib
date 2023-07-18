"use strict";
exports.__esModule = true;
exports.BaseResource = void 0;
var broker_model_1 = require("../models/broker.model");
var AWSProvider_1 = require("./implements/AWSProvider");
var RabbitMQProvider_1 = require("./implements/RabbitMQProvider");
var BaseResource = /** @class */ (function () {
    function BaseResource() {
        this.providerName = (process.env.PROVIDER || '').trim();
    }
    BaseResource.prototype.generateProvider = function () {
        switch (this.providerName) {
            case broker_model_1["default"].ByRabbitMQ:
                return new RabbitMQProvider_1.RabbitMQProvider();
            case broker_model_1["default"].ByAWS:
                return new AWSProvider_1.AWSProvider();
            default:
                throw new Error('Provider not implement');
        }
    };
    return BaseResource;
}());
exports.BaseResource = BaseResource;
