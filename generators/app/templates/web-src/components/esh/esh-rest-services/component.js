'use strict';

import bindingService from './bindingService';
import discoveryService from './discoveryService.js';
import groupSetupService from './groupSetupService.js';
import inboxService from './inboxService.js';
import itemService from './itemService.js';
import labelSetupService from './labelSetupService.js';
import linkService from './linkService.js';
import thingService from './thingService.js';
import thingSetupService from './thingSetupService.js';
import thingTypeService from './thingTypeService.js';

export default angular.module('esh.rest-services', [
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
