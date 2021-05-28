
import models from '../models';
import { UniqueEntityID } from '../../../../domain/UniqueEntityID';
import { DomainEvents } from '../../../../domain/events/DomainEvents';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
}

(async function createHooksForAggregateRoots () {
  const { Recipient, Transfer } = models;

  Recipient.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'recipient_id'));
  Recipient.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'recipient_id'));

  Transfer.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'transfer_id'));
  Transfer.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'transfer_id'));
  Transfer.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'transfer_id'));
  Transfer.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'transfer_id'));
  Transfer.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'transfer_id'));

  console.log('[Hooks]: Sequelize hooks setup.')

})();