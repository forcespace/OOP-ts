import {expect} from 'chai'
import {describe} from 'mocha'
import {parseArgs} from "../../../src/lab-2/2.1";

describe('2.1', () => {
    describe("parseArgs", () => {
        it('should return parsed arguments', () => {
            expect(parseArgs(["", "", "test"])).equals("test")
        });


    })
})