var chai = require('chai');
var expect = chai.expect;

chai.should()
const { isReadState, readState, streamFilter } = require('./../dist/tool')
//
describe('isReadState function test', function () {
    describe('numbner', function () {
        it('should be false', function () {
            isReadState(100).should.equal(false)
        });
    });
    describe('string', function () {
        it('should be false', function () {
            isReadState("100").should.equal(false)
        });
    });
    describe('with $', function () {
        it('should be true', function () {
            isReadState("$demo").should.equal(true)
        });
    });
    describe('array', function () {
        it('should be false', function () {
            isReadState([1, 2, 3]).should.equal(false)
        });
    });
    describe('object', function () {
        it('should be false', function () {
            isReadState({ name: "dawdwa" }).should.equal(false)
        });
    });
});
//
describe('readState function test', function () {
    describe('1 level', function () {
        it('should equal hahaha', function () {
            const key = '$demo'
            const state = {
                demo: "hahaha"
            }
            readState(key, state).should.equal('hahaha')
        })
    })
    describe('2 level', function () {
        it('should equal hahaha', function () {
            const key = '$demo.value'
            const state = {
                demo: {
                    value: "hahaha"
                }
            }
            readState(key, state).should.equal('hahaha')
        })
    })
    describe('3 level', function () {
        it('should equal hahaha', function () {
            const key = '$demo.value.lalala'
            const state = {
                demo: {
                    value: {
                        lalala: "hahaha"
                    }
                }
            }
            readState(key, state).should.equal('hahaha')
        })
    })
    describe('state is undefined', function () {
        it('should equal false', function () {
            const key = '$demo.value'
            const state = undefined
            readState(key, state).should.equal(false)
        })
    })
    describe('key is undefined', function () {
        it('should equal false', function () {
            const key = undefined
            const state = {
                demo: {
                    value: {
                        lalala: "hahaha"
                    }
                }
            }
            readState(key, state).should.equal(false)
        })
    })
    describe('key  and state are undefined', function () {
        it('should equal false', function () {
            const key = undefined
            const state = undefined
            readState(key, state).should.equal(false)
        })
    })
})
// streamFilter
describe('streamFilter funciton test', function () {
    describe('noral', function () {
        it('should equal  demo', function () {
            const val = {
                demo: "hahah"
            }
            streamFilter()
        })
    })
})