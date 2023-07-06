import Server from "./app.js";
import { CONFIG } from "./config.js";
import { connect } from "./database.js";

Server.listen(CONFIG.serverPort, () => {
  console.log(`Server running on port ${CONFIG.serverPort}`);
  connect();
});
