// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Messenger is AccessControl {
    event Message(address indexed sender, address indexed receiver, string message);

    struct MessageInfo {
        address sender;
        bytes message;
    }

    mapping(address => MessageInfo[]) public messages;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function sendMessage(string memory _message, address _to) public {
        bytes memory message = abi.encodePacked(_message);

        messages[_to].push(MessageInfo(msg.sender, message));
        emit Message(msg.sender, _to, _message);
    }

    function receiveMessage() public view returns (address, string memory) {
        MessageInfo memory messageInfo = messages[msg.sender][messages[msg.sender].length - 1];
        string memory message = string(abi.encodePacked(messageInfo.message));
        
        return (messageInfo.sender, message);
    }
}