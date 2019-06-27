/* 检查数字货币地址类型 */
var bitcoin = require('bitcoinjs-lib')
var Buffer = require('safe-buffer').Buffer

function strip0x (input) {
  if (typeof(input) !== 'string') {
    return input;
  }
  else if (input.length >= 2 && input.slice(0,2) === '0x') {
    return input.slice(2);
  }
  else {
    return input;
  }
}

function checkAddress(address) {
  	var coinType;
  	try {
	    bitcoin.address.fromBase58Check(address)
	    coinType = 'BTC'
	}catch(e){
	    var x = strip0x(address)
	    if (x.length == 40 && Buffer.from(x, 'hex').length == 20){
	        coinType = 'ETH'
	    }
	    else{
	        coinType = 'Invalid address'
	    }
	}
	return coinType
}

module.exports = checkAddress;