
import  { ApolloServer, Request } from "apollo-server-koa";
import Koa from "koa";
import { auth } from "./lib/auth";
import {dataloaders} from "./lib/dataloaders";
import * as queries from "./lib/queries";
import { schema } from "./schema.nexus";

const server = new ApolloServer({
                        schema,
                        context: (req) => {
                          const user = auth(req.ctx.request.header.authorization);
                          return {
                            req,
                            queries,
                            user,
                            dataloaders : dataloaders(),
                          };
                        }});

const app = new Koa();

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
);
