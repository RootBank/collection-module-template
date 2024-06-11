import * as root from '@rootplatform/node-sdk';
import Logger from '../../utils/logger';

class ProcessPolicyPaymentMethodAssignedEventController {
  async process({ policy }: { policy: root.Policy }) {
    // TODO: Implement policy payment method assigned processing

    Logger.info(`Not implemented`, {
      policy,
    });
  }
}

export default ProcessPolicyPaymentMethodAssignedEventController;
