import Logger from '../../utils/logger';

class ProcessPolicyCancellationEventsController {
  async process(rootPolicyId: string, event: string): Promise<void> {
    // TODO: Implement policy cancellation processing

    Logger.info(`Not implemented`, {
      rootPolicyId,
      event,
    });
  }
}

export default ProcessPolicyCancellationEventsController;
