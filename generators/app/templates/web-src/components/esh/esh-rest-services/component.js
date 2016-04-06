'use strict';

const bindingService = require('./bindingService');
const discoveryService = require('./discoveryService.js');
const groupSetupService = require('./groupSetupService.js');
const inboxService = require('./inboxService.js');
const itemService = require('./itemService.js');
const labelSetupService = require('./labelSetupService.js');
const linkService = require('./linkService.js');
const thingService = require('./thingService.js');
const thingSetupService = require('./thingSetupService.js');
const thingTypeService = require('./thingTypeService.js');

module.exports = angular.module('esh.rest-services', [
    bindingService.name,
    discoveryService.name,
    groupSetupService.name,
    inboxService.name,
    itemService.name,
    labelSetupService.name,
    linkService.name,
    thingService.name,
    thingSetupService.name,
    thingTypeService.name
]);
