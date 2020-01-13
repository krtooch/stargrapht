const { makeSchema } = require('nexus');

import * as main from './types/main';
import * as planet from './types/planet';
import * as spaceCenter from './types/spaceCenter';

export const schema = makeSchema({
  types: [main, planet, spaceCenter],
  outputs: {
    schema: `${__dirname}/../generated/schema.graphql`,
    typegen: `${__dirname}/../generated/typings.ts`,
  },
});

module.exports = { schema };
