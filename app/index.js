const usb = require('usb');
const board = require('./board');

usb.on('attach', function(device) {
  console.log('plugged in');

  board.connect().then(() => {
    board.sendCommand('version').then(response => {
      console.log(response);
      /*board.sendCommand('diff').then(response => {
        console.log(response);
      });*/
    });
  });
});
