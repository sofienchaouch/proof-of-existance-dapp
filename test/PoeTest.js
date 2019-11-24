const Poe = artifacts.require('Poe');
const should = require('chai').should();
const assertRevert = require('./helpers/assertRevert');

contract('Poe', async (accounts) => {

    describe('Ownership protection', function() {
        beforeEach(async function () {
           this.Poe = await Poe.new({from: accounts[0]});
        });

        let fileName = "deepgalactic.jpg";
        let ipfsHash = "QmciPjh2gS846wNGFja3kstXx7quAoybhr1WqTtvahUpFC";
        let tags = "game, dwarfs";
        let ext = "jpg"

        it("...should allow to see file that do not belongs to the owner", async function() {
            try
            {
                await this.Poe.setData(fileName, ipfsHash, tags, ext, {from: accounts[0]});
                let retrivedData = await this.Poe.getData(0, {from: accounts[0]});
                should.equal(fileName, retrievedData[0]);
                should.equal(ipfsHash, retrievedData[1]);
                should.equal(tags, retrievedData[2]);
                should.exist(retrievedData[3]);
                should.equal(ext, retrievedData[4]);
            }
            catch(error) { assertRevert(error) }
        });

        it("...should NOT allow to see files that do not belongs to the owner", async function() {
            try
            {
                await this.Poe.setData(fileName, ipfsHash, tags, ext, {from: accounts[0]});
                await this.Poe.getData(1, {from: accounts[1]});
                assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error) { assertRevert(error) }
        });
    });

    describe("Poe Smart contract file storage functions", async () => {
        beforeEach(async function () {
           this.Poe = await Poe.new({from: accounts[0]});
        });

        let fileName = "deepgalactic.jpg";
        let ipfsHash = "QmciPjh2gS846wNGFja3kstXx7quAoybhr1WqTtvahUpFC";
        let tags = "game, dwarfs";
        let ext = "jpg"

        let fileName2 = "battlefield.jpg";
        let ipfsHash2 = "QmPSxgX489JCUtsqkiGgFxxRGwdo67mFHA5kKiaenrEJcQ";
        let tags2 = "fps ww1";
        let ext2 = "jpg"

        it('...should have zero files at the beginning', async function () {
            should.not.equal([0], await this.Poe.getIndexes({from: accounts[0]}));
        });

        it('...should have more than zero files if files are added', async function () {
          should.exist(await this.Poe.setData(fileName, ipfsHash, tags, ext, {from: accounts[0]}));
          let indexes = await this.Poe.getIndexes({from: accounts[0]});
          assert.isAbove(indexes.length, 0, 'indexes length is greater than 0');
        });

        it('...should correctly recognize the data owner', async function () {
            should.exist(await this.Poe.setData(fileName, ipfsHash, tags, ext, {from: accounts[0]}));
            should.equal(accounts[0], await this.Poe.dataOwner.call(0));
        });

        it('...should correctly store data and retrieve data', async function () {
            should.exist(await this.Poe.setData(fileName, ipfsHash, tags, ext, {from: accounts[0]}));
            should.exist(await this.Poe.getIndexes({from: accounts[0]}));

            let retrievedData = await this.Poe.getData(0, {from: accounts[0]});
            should.equal(fileName, retrievedData[0]);
            should.equal(ipfsHash, retrievedData[1]);
            should.equal(tags, retrievedData[2]);
            should.exist(retrievedData[3]);
            should.equal(ext, retrievedData[4]);
        });

        it('...should match files indexes', async function () {
            await this.Poe.setData(fileName, ipfsHash, tags, ext, {from: accounts[0]});
            await this.Poe.setData(fileName2, ipfsHash2, tags2, ext2, {from: accounts[0]});

            let retrievedData = await this.Poe.getData(1, {from: accounts[0]});
            should.equal(fileName2, retrievedData[0]);
            should.equal(ipfsHash2, retrievedData[1]);
            should.equal(tags2, retrievedData[2]);
            should.exist(retrievedData[3]);
            should.equal(ext2, retrievedData[4]);
        });
    });

    describe('The input validation', function() {
        beforeEach(async function () {
           this.Poe = await Poe.new({from: accounts[0]});
        });

        let fileName = "deepgalactic.jpg";
        let ipfsHash = "QmciPjh2gS846wNGFja3kstXx7quAoybhr1WqTtvahUpFC";
        let tags = "game, dwarfs";
        let ext = "jpg"

        it("...should refuse input equal or bigger than the limit", async function() {
            try
            {
                await this.Poe.setData("The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold.",
                ipfsHash, tags, ext, {from: accounts[0]});
                assert.fail('Throws an exception');
            }
            catch(error) { assertRevert(error) }
        });

        it("...should accept input equal or lower than the limit", async function() {
            should.exist(await this.Poe.setData(fileName, ipfsHash, tags, ext, {from: accounts[0]}));
        });
    });


})
