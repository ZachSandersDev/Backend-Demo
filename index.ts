import express from "express";
import registerAllEndpoints from "./src/endpoints";

const server = express();

registerAllEndpoints(server);

server.listen(80, () => console.log(`
Demo github service running on :80
`));
