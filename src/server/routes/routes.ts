import express from 'express';
import { initialAggregateController,scheduleAggregateController } from '../controllers.ts/controller.js';

const route = express.Router();

// initial data
/**
 * @summary /search?url=
*/
route.get('/search',initialAggregateController)
// scheduled data
route.get('/check',scheduleAggregateController)

export{
    route
}