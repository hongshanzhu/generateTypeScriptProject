import { Frontend } from './frontend';

let httpServer: any = undefined;
httpServer = new Frontend().server().listen(5000);


// this function is called when you want the server to die gracefully
// i.e. wait for existing connections
function gracefulShutdown(): void {
  console.log('Received kill signal, shutting down gracefully.');
  httpServer.close(function(): void {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });

  // if after
  setTimeout(function(): void {
    console.log('Could not close connections in time, forcefully shutting down');
    process.exit(0);
  }, 30 * 1000);
};
// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

process.on('uncaughtException', function(err: any): void {
  console.log(err, 'Found an uncaughtException.');
  process.exit(1);
});
