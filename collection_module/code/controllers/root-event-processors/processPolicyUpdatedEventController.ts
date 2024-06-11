import * as root from '@rootplatform/node-sdk';
import Logger from '../../utils/logger';

class ProcessPolicyUpdatedEventController {
  async process(params: { rootPolicyId: string; updates: any }): Promise<void> {
    const { rootPolicyId, updates } = params;

    // TODO: Implement policy update processing

    Logger.info(`Not implemented yet`, {
      rootPolicyId,
      updates,
    });
  }

  /**
   * Processes a billing day update for a policy by updating the associated payment provider subscription schedule.
   *
   * @param {Object} params - Parameters object.
   * @param {Object} params.policy - The policy object containing information about the billing day update.
   *
   * @returns {Promise<void>} - A Promise that resolves when the billing day update process is complete.
   * @throws {Error} - Throws an error if there is an issue during the update process.
   */

  async processBillingDayUpdate(policy: root.Policy): Promise<void> {
    // TODO: Implement billing day update processing

    Logger.info('Not implemented yet', {
      policy,
    });
  }
}

export { ProcessPolicyUpdatedEventController };
