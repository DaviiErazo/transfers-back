
import models from '../models';
import { UniqueEntityID } from '../../../../domain/UniqueEntityID';
import { DomainEvents } from '../../../../domain/events/DomainEvents';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
}

(async function createHooksForAggregateRoots () {
  const { Recipient } = models;

  Recipient.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'recipient_id'));

  console.log('[Hooks]: Sequelize hooks setup.')

})();