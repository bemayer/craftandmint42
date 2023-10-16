// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20.0;

import {ERC721, ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CraftAndMint42 is ERC721Enumerable, Ownable {
    uint public nextTokenId;
    address public admin;

    constructor(address initialOwner) Ownable(initialOwner) ERC721("CraftAndMint42", "CAM42") {
        admin = msg.sender;
    }

    function mint(address to) external onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.example.com/metadata/";
    }
}
