import * as root from '@rootplatform/node-sdk';
import Logger from '../../utils/logger';

class ProcessCreatePaymentEventController {
  /**
   * Process payment creation event. When a pending payment is created on Root, we create a payment intent on the payment provider.
   * NB: PaymentIntents are outside the subscription lifecycle and are not linked to a subscription billing cycle.
   *
   * @param {Object} params - An object containing payment parameters.
   * @param {string} params.rootPaymentId - The root payment ID associated with the payment.
   * @param {string} params.rootPolicyId - The root policy ID linked to the payment.
   * @param {number} params.amount - The payment amount.
   * @param {string} params.description - The description of the payment.
   * @param {string} params.status - The status of the payment.
   *
   * @returns {Promise<void>} A Promise that resolves after processing the payment event.
   *
   */
  async process(params: {
    rootPaymentId: string;
    rootPolicyId: string;
    amount: number;
    description: string;
    status: root.PaymentStatus;
  }): Promise<void> {
    // TODO: Implement payment creation processing

    Logger.debug(`Not implemented`, {
      params,
    });
  }
}

export default ProcessCreatePaymentEventController;
