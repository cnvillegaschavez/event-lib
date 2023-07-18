
const express = require("express");
const app = express();

require('dotenv').config()
import { subscribeMessage } from '../events/src/index'

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