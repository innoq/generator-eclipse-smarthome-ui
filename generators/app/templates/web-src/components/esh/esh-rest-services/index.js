'use strict';

const MODULE_ID = 'esh.rest-services';
export {MODULE_ID as name};

angular.module(MODULE_ID, [])
  .factory('bindingService', require('./BindingService').default)
  .factory('itemService', require('./ItemService').default)
  .factory('discoveryService', require('./DiscoveryService').default)
  .factory('groupSetupService', require('./GroupSetupService').default)
  .factory('inboxService', require('./InboxService').default)
  .factory('labelSetupService', require('./LabelSetupService').default)
  .factory('linkService', require('./LinkService').default)
  .factory('thingService', require('./ThingService').default)
  .factory('thingTypeService', require('./ThingTypeService').default)
;
