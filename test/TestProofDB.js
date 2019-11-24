var ProofDB = artifacts.require('ProofDB.sol');
var Web3 = require('web3');

contract('ProofDB contract test suit', function (accounts) {

    var web3 = new Web3();
    let docTags = web3.fromAscii("Blockchain, Ethereum, Solidity")

    // ProofDB contract has a data structure to hold allowed contracts and accounts.
    // this test ensures that owner is able to add a contract to allowed owners.
    it('Test add allowed contracts', function () {
        const contractAddr = "0xaca0000620f00001e7200003b3a00004e140000d";
        const owner = accounts[0];
        let contractInstance = null;
        return ProofDB.deployed().then((instance) => {
            contractInstance = instance;
            instance.addAllowedContractOrOwner(contractAddr, { from: owner });
        }).then(() => {
            return contractInstance.isAllowedContractOrOwner.call(contractAddr, { from: owner });
        }).then((status) => {
            const expected = true;
            const actual = status;
            assert.equal(expected, actual, "Should return true if successfully added to the allowed list");
        })
    });

    // ProofDB contract has a data structure to hold allowed contracts and accounts.
    // this test ensures that owner is able to add a account/address to allowed owners.
    it('Test add allowed owner', function () {
        const owner = accounts[0];
        let contractInstance = null;
        return ProofDB.deployed().then((instance) => {
            contractInstance = instance;
            instance.addAllowedContractOrOwner(owner, { from: owner });
        }).then(() => {
            return contractInstance.isAllowedContractOrOwner.call(owner, { from: owner });
        }).then((status) => {
            const expected = true;
            const actual = status;
            assert.equal(expected, actual, "Should return true if succesfully added to the allowed list");
        })
    });

    // this test ensures that unauthorized users  are not able to add owners.
    it('Test add allowed contract by unauthorized owner', function () {
        const contractAddr = "0xaca0000620f00001e7200003b3a00004e141234d";
        const owner = accounts[0];
        return ProofDB.deployed().then((instance) => {
            return instance.isAllowedContractOrOwner.call(contractAddr, { from: owner });
        }).then((status) => {
            const expected = false;
            const actual = status;
            assert.equal(expected, actual, "Should return false for a unauthrized contract");
        })
    });

    // this test ensures that users are able to add documents to the data store succesfully
    // it also also ensures that users are able to retrieve the documents succesfully.
    it('Test add document', function () {
        const caller = accounts[1];
        const docHash = "0x6550e5e1486f087856ca7d646c17f74d91df14641f34733ae4f12941d7fc89c2";
        const userName = "Santu";
        const ipfsHash = "ipfshashsdocument1";
        const owner = accounts[0];
        return ProofDB.deployed().then((instance) => {
            instance.addDocument(caller, docHash, userName, ipfsHash, docTags, { from: owner });
            return instance.getDocument.call(caller, docHash, { from: owner })
        }).then((document) => {
            const expected = docHash;
            const actual = document[0];
            assert.equal(expected, actual, "Should return a inserted docHast " + docHash);
        })
    });

    // seperate group to test total number of document uploaded(clean room to run below tests)
    // this test ensures that the all documents method returns all the documents available to the user.
    // for example if a user uploads 2 documents, fetchAllDocuments should return  2 document hashes.
    contract('ProofDB contract test suit - fetch all documents', function (accounts) {
        it('Test fetch all documents', function () {
            const caller = accounts[1];
            const docHash1 = "0x6550e5e1486f087856ca7d646c17f74d91df14641f34733ae4f12941d7fc89d3";
            const docHash2 = "0x6550e5e1486f087856ca7d646c17f74d91df14641f34733ae4f12941d7fc89d4";
            const userName = "Santu";
            const ipfsHash = "ipfshashsdocument1";
            const owner = accounts[0];
            return ProofDB.deployed().then((instance) => {
                instance.addDocument(caller, docHash1, userName, ipfsHash, docTags, { from: owner });
                instance.addDocument(caller, docHash2, userName, ipfsHash, docTags, { from: owner });
                return instance.fetchAllDocuments.call(caller, { from: owner });
            }).then((documents) => {
                const expected = 2;
                const actual = documents.length;
                assert.equal(expected, actual, "total number of document should be 2");
            })
        });
    })



})