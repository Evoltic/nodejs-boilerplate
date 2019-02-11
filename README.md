## Simple Web Application Backend
### Supported features: Login, signup. Get account, create account: all via authorization layer.

#### Things to worth to mention:

1. Good error handlers. If something went wrong on the server - a client will recieve a clear message about that happened and what should the client do. Check "src/server/errors" folder and especially "mapDomainErrorToHttpResponse.js" in the same folder.

2. You can easily switch dependencies because you can only communicate with dependencies through an interface.

3. Serverless integration. Just pick a function in api folder, write config and store it in a cloud.
