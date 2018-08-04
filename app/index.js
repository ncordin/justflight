const board = require('./board');

board.onConnect(() => {
  console.log('Board connected :)');

  board.sendCommand('version').then(response => {
    console.log(response);
    /*board.sendCommand('diff').then(response => {
        console.log(response);
      });*/
  });
});

board.onUnplugged(() => console.log('Bye bye...'));
