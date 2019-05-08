/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

const fileToBeRemoved = url => {
  var matchCondition = url.split("=");
  return matchCondition[0] === "/documents?documentCollectionId";
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function(req, res, next) {
  setTimeout(next, 1000);
});

// Declaring custom routes below. Add custom routes before JSON Server router
server.use(
  jsonServer.rewriter({
    "/api/docmanager/*": "/$1",
    "/collections/:id/documents": "/documents?documentCollectionId=:id"
  })
);
// Use default router
server.use(router);

router.render = function(req, res) {
  if (fileToBeRemoved(req.url)) {
    var data = res.locals.data;
    for (var i = 0; i < res.locals.data.length; i++) {
      data[i].documentFile = null;
    }
    res.jsonp(data);
  } else {
    res.jsonp(res.locals.data);
  }
};

// Start server
const port = 13005;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
