// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title CraftAndMint42
/// @dev This contract allows for the minting, and ownership management of unique digital assets represented as non-fungible tokens (NFTs).
contract CraftAndMint42 is ERC721URIStorage {
    uint public nextTokenId;
    address public admin;

    /// @dev Struct to store metadata of each NFT.
    struct NftInfo {
        address owner;
        string title;
        string uri;
    }

    /// @dev Mapping from token ID to NftInfos.
    mapping(uint => NftInfo) public nftInfos;


    /// @dev Contract constructor initializes the contract with a name and symbol for the NFT.
    constructor() ERC721("CraftAndMint42", "CM42") {
        admin = msg.sender;
    }

    /// @dev Modifier to check if the function caller is the admin.
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    /// @dev Modifier to check if the function caller is the owner of the token.
    modifier onlyOwner(uint tokenId) {
        require(nftInfos[tokenId].owner == msg.sender, "Not token owner");
        _;
    }

    /// @notice Allows the admin to mint new tokens.
    /// @param to The address to mint the new token to.
    /// @param title The title of the artwork.
    /// @param ipfsHash The IPFS hash of the artwork.
    function mint(address to, string memory title, string memory ipfsHash) external onlyAdmin {
        uint tokenId = nextTokenId;
        nextTokenId++;
        _mint(to, tokenId);
        string memory uri = string(abi.encodePacked("https://gateway.ipfs.io/ipfs/", ipfsHash));
        _setTokenURI(tokenId, uri);
        nftInfos[tokenId] = NftInfo({
            owner: to,
            title: title,
            uri: uri
        });
    }

    /// @notice Retrieves info of all tokens.
    /// @dev This function could be very gas expensive and exceed block gas limits as the number of tokens increases.
    /// @return An array of NftInfo structs containing info about each token.
    function getAllOwnersInfo() external onlyAdmin view returns (NftInfo[] memory) {
        uint totalTokens = nextTokenId;
        NftInfo[] memory infos = new NftInfo[](totalTokens);
        for (uint i = 0; i < totalTokens; i++) {
            infos[i] = nftInfos[i];
        }
        return infos;
    }

    /// @notice Allows a token owner or an approved address to transfer the token.
    /// @param to The address to transfer the token to.
    /// @param tokenId The ID of the token to transfer.
    function transfer(address to, uint tokenId) external onlyOwner(tokenId) {
        _transfer(msg.sender, to, tokenId);
        nftInfos[tokenId].owner = to;
    }
}
