function getCoinPrice(ws, response){ 
  var send = {};
  send.coinPrice = '';
  ws.send(JSON.stringify(send));
  ws.onmessage = (e) => {
    response.ETHPrice = JSON.parse(e.data).ETHPrice;
    response.RMBRate = JSON.parse(e.data).RMBate;
  }
}

module.exports = getCoinPrice;