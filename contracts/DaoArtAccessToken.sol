// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract DaoArtAccessToken is AccessControl, ERC721Enumerable {
    string private contractUri;
    address payable private wallet;
    mapping(uint256 => string) public tokenUris;
    uint256 public startPrice;
    uint256 public step;
    uint256 public stepIncrease;
    uint256 public tokensSupply;
    uint256 public tokensCount = 0;

    /*
     * @dev constructor
     * @param _contractUri - new contract uri
     * @param _wallet - wallet to get payments (also get admin permission)
     * @param _startPrice - start price
     * @param _step - tokens step
     * @param _stepIncrease - step increase
     * @param _tokensSupply - total supply of tokens
    */
    constructor(
        string memory _contractUri,
        address payable _wallet,
        uint256 _startPrice,
        uint256 _step,
        uint256 _stepIncrease,
        uint256 _tokensSupply
    ) ERC721("DAO-Art.eth Access token", "DAOART") {
        contractUri = _contractUri;
        wallet = _wallet;
        startPrice = _startPrice;
        step = _step;
        stepIncrease = _stepIncrease;
        tokensSupply = _tokensSupply;
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(DEFAULT_ADMIN_ROLE, _wallet);
    }

    /*
     * @dev Set wallet to get payments (also get admin permission)
    */
    function setWallet(address payable _wallet) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(DEFAULT_ADMIN_ROLE, wallet);
        wallet = _wallet;
        grantRole(DEFAULT_ADMIN_ROLE, _wallet);
    }

    /*
     * @dev Set token price params
     * @param _startPrice - start price
     * @param _step - tokens step
     * @param _stepIncrease - step increase
     * @param _tokensSupply - total supply of tokens
    */
    function setTokenParams(
        uint256 _startPrice,
        uint256 _step,
        uint256 _stepIncrease,
        uint256 _tokensSupply
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        startPrice = _startPrice;
        step = _step;
        stepIncrease = _stepIncrease;
        tokensSupply = _tokensSupply;
    }

    /**
     * @dev Change contract metadata uri.
     *
     * @param _contractUri - new contract uri
    */
    function setContractUri(string memory _contractUri) external onlyRole(DEFAULT_ADMIN_ROLE) {
        contractUri = _contractUri;
    }

    /*
     * @dev Buy dao art access token
     *
     * @param metaUri - uri to token metadata
    */
    function buyToken(string memory metaUri) external payable {
        require(balanceOf(_msgSender()) == 0, "DaoArtToken: token already owned for this address");
        uint256 resultPrice = startPrice + stepIncrease*(tokensCount/step);
        require(msg.value == resultPrice, "DaoArtToken: wrong transaction value");
        require(wallet.send(resultPrice), "DaoArtToken: transfer wei failed");
        _mint(_msgSender(), metaUri);
    }

    /*
     * @dev Mint dao art access token without payment
     *
     * @param to - receiver address
     * @param metaUri - uri to token metadata
    */
    function mint(address to, string memory metaUri) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(balanceOf(to) == 0, "DaoArtToken: token already owned for this address");
        _mint(to, metaUri);
    }

    /// @dev supports interface for inheritance conflict resolving.
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return interfaceId == type(IERC721Enumerable).interfaceId ||
        super.supportsInterface(interfaceId) ||
        interfaceId == type(IAccessControl).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenUris[tokenId];
    }

    /**
     * @dev Contract metadata URI for OpenSea integration
    */
    function contractURI() public view returns (string memory) {
        return contractUri;
    }

    function _mint(address to, string memory metaUri) internal {
        tokensCount++;
        tokenUris[tokensCount-1] = metaUri;
        _safeMint(to, tokensCount-1);
    }
}