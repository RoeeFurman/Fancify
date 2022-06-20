// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UntitledModel } = initSchema(schema);

export {
  UntitledModel
};