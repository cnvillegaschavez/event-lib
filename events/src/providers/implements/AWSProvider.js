"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AWSProvider = void 0;
var config_1 = require("../../config");
var AWS = require("aws-sdk");
var sqs_consumer_1 = require("sqs-consumer");
var AWSProvider = /** @class */ (function () {
    function AWSProvider() {
        this.validJSON = function (cadena) {
            return new Promise(function (resolve, reject) { return resolve(JSON.parse(cadena)); });
        };
        if (!config_1.config.aws.region) {
            throw new Error('configuration AWS REGION');
        }
        AWS.config.update({ region: config_1.config.aws.region });
    }
    AWSProvider.prototype.isValidSnsConfig = function () {
        if (!config_1.snsConfig.topicArn) {
            throw new Error('configuration sns incomplete');
        }
    };
    AWSProvider.prototype.publishEvent = function (eventName, message) {
        this.isValidSnsConfig();
        var instanceSNS = new AWS.SNS();
        var params = {
            MessageAttributes: {
                sourceName: {
                    DataType: 'String',
                    StringValue: config_1.snsConfig.sourceName
                },
                eventName: {
                    DataType: 'String',
                    StringValue: eventName
                }
            },
            Subject: eventName,
            Message: message,
            TopicArn: config_1.snsConfig.topicArn
        };
        return instanceSNS.publish(params).promise();
    };
    AWSProvider.prototype.subscriptionOnEvent = function (onCallback) {
        var _this = this;
        if (!config_1.sqsConfig.sqsUrl) {
            throw new Error("configuration EVENT_CONNECT_STRING incomplete ".concat(config_1.sqsConfig));
        }
        var consumer = sqs_consumer_1.Consumer.create({
            queueUrl: config_1.sqsConfig.sqsUrl,
            handleMessage: function (message) { return __awaiter(_this, void 0, void 0, function () {
                var messageBody, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.clearMessage(JSON.parse(message.Body))];
                        case 1:
                            messageBody = _a.sent();
                            // Realizamos el llamos al callback
                            onCallback(null, messageBody);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            onCallback(error_1, message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            batchSize: config_1.sqsConfig.iterations,
            attributeNames: config_1.sqsConfig.sourceNames.split(','),
            visibilityTimeout: config_1.sqsConfig.visibilityTimeout,
            sqs: new AWS.SQS()
        });
        // TODO: Evaluar llas instanciass por cola e un solo timer
        consumer.start();
    };
    AWSProvider.prototype.clearMessage = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validJSON(body.Message)
                            .then(function (messageJson) {
                            return messageJson;
                        })["catch"](function (eror) {
                            return body.Message;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AWSProvider;
}());
exports.AWSProvider = AWSProvider;
