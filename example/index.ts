
const express = require("express");
import { subscribeMessage } from '../events/src/index'
const app = express();
require('dotenv').config()


export const subscribeMessageService = () => {
    console.log('start subscribe message service')
    subscribeMessage(async (error, data) => {
        if (data) {
            console.log(new Date(), data)
        }
        
    });
};

app.listen(4010, () => {
	console.log(`Example app listening on port ${4010}`)
    subscribeMessageService();
})