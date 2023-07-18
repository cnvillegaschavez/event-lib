"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.EventReceiver = void 0;
var BaseResource_1 = require("./providers/BaseResource");
var EventReceiver = /** @class */ (function (_super) {
    __extends(EventReceiver, _super);
    function EventReceiver() {
        var _this = _super.call(this) || this;
        _this.provider = _this.generateProvider();
        return _this;
    }
    EventReceiver.prototype.onSubscribeEvent = function (onCallback) {
        this.provider.subscriptionOnEvent(onCallback);
    };
    return EventReceiver;
}(BaseResource_1.BaseResource));
exports.EventReceiver = EventReceiver;
