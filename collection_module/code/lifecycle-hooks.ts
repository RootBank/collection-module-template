import ProcessCreatePaymentEventController from './controllers/root-event-processors/processCreatePaymentEventController';
import ProcessPolicyPaymentMethodAssignedEventController from './controllers/root-event-processors/processPolicyPaymentMethodAssignedEventController';
import ProcessPolicyAlterationEventsController from './controllers/root-event-processors/processPolicyAlterationEventsController';
import ProcessPolicyCancellationEventsController from './controllers/root-event-processors/processPolicyCancellationEventsController';

import * as root from '@rootplatform/node-sdk';
import { ProcessPolicyUpdatedEventController } from './controllers/root-event-processors/processPolicyUpdatedEventController';
import Logger from './utils/logger';

const RootSupportedEvent = {
  PaymentMethodAssigned: 'payment_method_assigned',
  PaymentCreated: 'payment_created',
  PaymentMethodRemoved: 'payment_method_removed',
  PolicyAlterationPackageApplied: 'policy_alteration_package_applied',
  PolicyCancelled: 'policy_cancelled',
  PolicyExpired: 'policy_expired',
  PolicyLapsed: 'policy_lapsed',
  PolicyUpdated: 'policy_updated',
};

export const afterPolicyIssued = () => {};

export const createPaymentMethod = ({ data }: { data: any }) => {
  return {
    module: data,
  };
};

export const renderCreatePaymentMethod = async () => {
  // Render the payment method creation form

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Add your CSS styling here */
        </style>
      </head>
      <body>
          /* Add your payment method form here */
      </body>
    </html>`;
};

export const renderViewPaymentMethodSummary = async (params: {
  payment_method: any;
}) => {
  // Render the payment method summary view
  const { payment_method } = params;
  const paymentMethodId = payment_method?.module?.payment_method as string;

  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Add your CSS styling here */
        </style>
      </head>
      <body>
          /* Add your payment method summary here */
          ${paymentMethodId}
      </body>
    </html>`;
};

export const renderViewPaymentMethod = async (params: any) => {
  const { payment_method, policy } = params;

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Table</title>
  <style>
      body {
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        color: rgb(61, 61, 61);
        margin: 0px;
        padding: 0px;
        height: 100%
        margin-bottom: -30px;
      }
      
      table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0px;
          table-layout: fixed; /* Ensures each column is of equal width */
      }
      th, td {
          padding: 8px;
          text-align: left;
          width: 50%; /* Sets each column to 50% width */
      }
      th {

      }
      td.key {
          font-family: monospace;
          color: blue;
      }
      /* Remove all borders from table, th, and td */
      table, th, td {
          border: none;
      }
  </style>
  </head>
  <body>
  <table>
      <tr>
          <th>Type</th>
          <td>Collection module</td>
      </tr>
      <tr>
          <th class="no-background">Key</th>
          <td class="key">${payment_method.collection_module_key}</td>
      </tr>
      <tr>
          <th>Id</th>
          <td>${payment_method.module.id}</td>
      </tr>
      <tr>
          <th>Payment method</th>
          <td>${payment_method.module.payment_method}</td>
      </tr>
      <tr>
          <th>Billing day</th>
          <td>${policy.billing_day}</td>
      </tr>
      <tr>
          <th>Livemode</th>
          <td>${payment_method.module.livemode}</td>
      </tr>
      <tr>
          <th>Status</th>
          <td>${payment_method.module.status}</td>
      </tr>
      <tr>
          <th>Usage</th>
          <td>${payment_method.module.usage}</td>
      </tr>
  </table>
  </body>
  </html>`;
};

export const afterPolicyPaymentMethodAssigned = async ({
  policy,
}: {
  policy: root.Policy;
}) => {
  Logger.info(`start`, {
    policy,
  });

  await new ProcessPolicyPaymentMethodAssignedEventController().process({
    policy,
  });

  Logger.info(`complete`, {
    policy,
  });
};

export const afterPaymentCreated = async ({
  policy,
  payment,
}: {
  policy: root.Policy;
  payment: any;
}) => {
  Logger.info(`start`, {
    policy,
  });

  await new ProcessCreatePaymentEventController().process({
    rootPaymentId: payment.payment_id,
    rootPolicyId: policy.policy_id,
    amount: payment.amount,
    description: payment.description,
    status: payment.status,
  });

  Logger.info(`complete`, {
    policy,
  });
};

export function afterPaymentUpdated({
  policy,
  payment,
}: {
  policy: root.Policy;
  payment: root.PaymentMethod;
}) {
  Logger.info(`start`, {
    policy,
    payment,
  });

  // Not implemented

  Logger.info(`complete`, {
    policy,
    payment,
  });
}

export const afterPaymentMethodRemoved = async ({
  policy,
}: {
  policy: root.Policy;
}) => {
  Logger.info(`start`, {
    policy,
  });

  await new ProcessPolicyCancellationEventsController().process(
    policy.policy_id,
    RootSupportedEvent.PaymentMethodRemoved,
  );

  Logger.info(`complete`, {
    policy,
  });
};

export const afterPolicyCancelled = async ({
  policy,
}: {
  policy: root.Policy;
}) => {
  Logger.info(`start`, {
    policy,
  });

  await new ProcessPolicyCancellationEventsController().process(
    policy.policy_id,
    RootSupportedEvent.PolicyCancelled,
  );

  Logger.info(`complete`, {
    policy,
  });
};

export const afterPolicyExpired = async ({
  policy,
}: {
  policy: root.Policy;
}) => {
  Logger.info(`start`, {
    policy,
  });

  await new ProcessPolicyCancellationEventsController().process(
    policy.policy_id,
    RootSupportedEvent.PolicyExpired,
  );

  Logger.info(`complete`, {
    policy,
  });
};

export const afterPolicyLapsed = async ({
  policy,
}: {
  policy: root.Policy;
}) => {
  Logger.info(`start`, {
    policy,
  });

  await new ProcessPolicyCancellationEventsController().process(
    policy.policy_id,
    RootSupportedEvent.PolicyLapsed,
  );

  Logger.info(`complete`, {
    policy,
  });
};

export const afterPolicyUpdated = async ({
  policy,
  updates,
}: {
  policy: root.Policy;
  updates: any;
}) => {
  Logger.info('start', {
    policy,
    updates,
  });

  await new ProcessPolicyUpdatedEventController().process({
    rootPolicyId: policy.policy_id,
    updates,
  });

  Logger.info('complete', {
    policy,
    updates,
  });
};

export const afterAlterationPackageApplied = async ({
  policy,
  alteration_package,
  alteration_hook_key,
}: {
  policy: root.Policy;
  alteration_package: any;
  alteration_hook_key: string;
}) => {
  Logger.info(`start`, {
    policy,
    alteration_package,
    alteration_hook_key,
  });

  await new ProcessPolicyAlterationEventsController().process({
    rootPolicyId: policy.policy_id,
    updatedMonthlyPremiumAmount: policy.monthly_premium,
    currency: policy.currency,
    billingFrequency: policy.billing_frequency as
      | 'monthly'
      | 'yearly'
      | 'once_off',
    rootPolicyStartDate: policy.start_date,
    rootPolicyEndDate: policy.end_date,
    billingDay: policy.billing_day,
    policyAppData: policy.app_data,
    alterationHookKey: alteration_hook_key,
    alterationPackage: alteration_package,
  });

  Logger.info(`complete`, {
    policy,
    alteration_package,
    alteration_hook_key,
  });
};
