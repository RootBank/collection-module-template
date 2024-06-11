import Logger from '../../utils/logger';

interface ProcessParams {
  rootPolicyId: string;
  updatedMonthlyPremiumAmount: number;
  currency: string;
  billingFrequency: 'monthly' | 'yearly' | 'once_off';
  rootPolicyStartDate: string;
  rootPolicyEndDate: string;
  billingDay: number | null;
  policyAppData: any;
  alterationHookKey: string;
  alterationPackage: any;
}

class ProcessPolicyAlterationEventsController {
  async process(params: ProcessParams) {
    const { alterationHookKey } = params;

    const UPDATE_BILLING_FREQUENCY_HOOK_KEY = 'update_billing_frequency';
    const COLLECT_OUTSTANDING_PREMIUM_KEY = 'collect_outstanding_premium';
    const COLLECT_ADHOC_PAYMENT_KEY = 'collect_adhoc_payment';
    const RENEW_POLICY_HOOK_KEY = 'renew_policy';
    const UPDATE_POLICY_COVER = 'update_policy_cover';

    Logger.info(`processing alteration hook`, {
      alterationHookKey,
    });

    switch (alterationHookKey) {
      case UPDATE_BILLING_FREQUENCY_HOOK_KEY:
      case COLLECT_OUTSTANDING_PREMIUM_KEY: {
        // TODO: Implement the process for updating the billing frequency
        Logger.info(`Case ${COLLECT_OUTSTANDING_PREMIUM_KEY} not Implemented`);

        break;
      }
      case RENEW_POLICY_HOOK_KEY: {
        // TODO: Implement the process for renewing the policy
        Logger.info(`Case ${RENEW_POLICY_HOOK_KEY} not Implemented`);

        break;
      }
      case COLLECT_ADHOC_PAYMENT_KEY: {
        // TODO: Implement the process for collecting adhoc payments
        Logger.info(`Case ${COLLECT_ADHOC_PAYMENT_KEY} not Implemented`);

        break;
      }
      case UPDATE_POLICY_COVER:
        // TODO: Implement the process for updating the policy cover
        Logger.info(`Case ${UPDATE_POLICY_COVER} not Implemented`);

        break;
      default: {
        // TODO: Implement the process for other alteration hooks
        Logger.info(`Case default not Implemented`);
        break;
      }
    }
  }
}

export default ProcessPolicyAlterationEventsController;
