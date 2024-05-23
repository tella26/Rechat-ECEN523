import * as traceloop from "@traceloop/node-server-sdk";
import * as LlamaIndex from "llamaindex";

export const initObservability = () => {
  traceloop.initialize({
    appName: "Rechat - Researcher Chat",
    disableBatch: true,
    instrumentModules: {
      llamaIndex: LlamaIndex,
    },
  });
};
