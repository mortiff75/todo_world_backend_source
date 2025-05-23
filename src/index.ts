import { app } from "./app";
import path from "path";
import https from "https";
import fs from "fs";
import { cwd } from "process";
// Setup Config DotEnv

const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync(path.join(cwd(), "key.pem")),
  cert: fs.readFileSync(path.join(cwd(), "cert.pem")),
};

const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
