const { makeSchema } = require("nexus");

import * as flight from "./types/flight";
import * as input from "./types/input";
import * as main from "./types/main";
import * as planet from "./types/planet";
import * as scalar from "./types/scalar";
import * as spaceCenter from "./types/spaceCenter";

export const schema = makeSchema({
  types: [main, planet, spaceCenter, flight, scalar, input],
  outputs: {
    schema: `${__dirname}/../generated/schema.graphql`,
    typegen: `${__dirname}/../generated/typings.ts`,
  },
});

module.exports = { schema };
