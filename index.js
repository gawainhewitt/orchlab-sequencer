const EventBinders = require('./eventBinders');
const EventHandlers = require('./eventHandlers');
const CoolStuffHappens = require('./coolStuffHappens');
const DomManager = require('./domManager');

const eventBinders = new EventBinders;
const coolStuffHappens = new CoolStuffHappens;
const domManager = new DomManager;
const eventHandlers = new EventHandlers(eventBinders, coolStuffHappens, domManager);

