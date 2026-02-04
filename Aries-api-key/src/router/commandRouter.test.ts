import { SovereignEvolution } from './commandRouter';
import { Logger } from '../../audit/auditLogger';
const logger = new Logger();
const runTest = async () => {
  try {
    const instance = new SovereignEvolution();
    await instance.run();
  } catch (e: any) { await logger.log('TEST_FAIL', e.message); }
};
runTest();