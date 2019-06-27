/* 查询智能合约 */

function inquireSmartContract(ws, abi, functionName, args, contractAddr) {
	var send = {};
	method = [];
	method.push(args);
	method.push(functionName);
	method.push(contractAddr);
	method.push(abi);
	send.callContract = method;
	ws.send(JSON.stringify(send));
    ws.onmessage = (e) => {
    	response = JSON.parse(e.data);
    	if (response.err) {
    		alert(response.err);
    	}
    	alert(response.result);
    }
}

module.exports = inquireSmartContract;