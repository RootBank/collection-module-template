import moment from 'moment-timezone';
import rootClient from '../clients/root-client';
import ModuleError from './error';

/**
 * Checks if a policy payment method has a collection module definition associated with it.
 */
export async function isPolicyPaymentMethodLinkedToCollectionModule(
  policyId: string,
) {
  const paymentMethod = await rootClient.SDK.getPolicyPaymentMethod({
    policyId,
  });
  return !!paymentMethod.collection_module_definition_id;
}

/**
 * Gets the next occurrence of a target day on or after a reference date
 * @param referenceDate
 * @param targetDay
 * @returns
 */
export const getNextOccurrence = (
  referenceDate: moment.Moment,
  targetDay: number,
) => {
  if (targetDay < 1) {
    throw new ModuleError(
      `Target Day needs to be >= 1 to be valid. TargetDay=${targetDay}`,
    );
  }

  // Find the next occurrence of the target day on or after the reference date
  let nextOccurrence = moment(referenceDate).date(targetDay);

  if (nextOccurrence.isBefore(referenceDate)) {
    nextOccurrence = nextOccurrence.add(1, 'months');
  }

  if (nextOccurrence < referenceDate) {
    throw new ModuleError(`NextOccurrence date needs to be >= ReferenceDate.`, {
      nextOccurrence: nextOccurrence.toISOString(),
      referenceDate: referenceDate.toISOString(),
    });
  }

  return nextOccurrence;
};
