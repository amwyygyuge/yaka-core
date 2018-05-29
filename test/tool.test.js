
const { isReadState, readState } = require('./../dist/tool')
const { streamFilter } = require('./../dist/engines/model/stream')
//
describe('isReadState function test', function () {
    describe('numbner', function () {
        it('should be false', function () {
            expect(isReadState(100)).toBe(false)
        });
    });
    describe('string', function () {

        it('should be false', function () {
            expect(isReadState("100")).toBe(false)
        });
    });
    describe('with $', function () {
        it('should be true', function () {
            expect(isReadState("$demo")).toBe(true)
        });
    });
    describe('array', function () {
        it('should be false', function () {
            expect(isReadState([1, 2, 3])).toBe(false)
        });
    });
    describe('object', function () {
        it('should be false', function () {
            expect(isReadState({ name: "dawdwa" })).toBe(false)
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
            expect(readState(key, state)).toBe('hahaha')
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
            expect(readState(key, state)).toBe('hahaha')
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
            expect(readState(key, state)).toBe('hahaha')
        })
    })
    describe('state is undefined', function () {
        it('should equal false', function () {
            const key = '$demo.value'
            const state = undefined
            expect(readState(key, state)).toBe(false)
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
            expect(readState(key, state)).toBe(false)
        })
    })
    describe('key  and state are undefined', function () {
        it('should equal false', function () {
            const key = undefined
            const state = undefined
            expect(readState(key, state)).toBe(false)
        })
    })
})
// streamFilter
describe('streamFilter funciton test', function () {
    describe('booean', function () {
        it('should equal  true', function () {
            const val = {
                demo: "hahah"
            }
            expect(streamFilter(true, {})).toBe(true)
        })
    })
    describe('self', function () {
        it('should equal  val', function () {
            const val = {
                demo: "hahah"
            }
            expect(streamFilter("self", val)).toBe(val)
        })
    })
    describe('string', function () {
        it('should equal  hahha', function () {
            const val = {
                demo: {
                    value: 'hahha'
                }
            }
            expect(streamFilter("demo.value", val)).toBe('hahha')
        })
    })
    describe('number', function () {
        it('should equal  null', function () {
            const val = {
                demo: {
                    value: 'hahha'
                }
            }
            expect(streamFilter(10000, val)).toBeNull()
        })
    })
    describe('object', function () {
        it('should equal  null', function () {
            const streamIn = {
                test: "demo.value",
                demo: {
                    value: "id",
                    name: "value"
                }
            }
            const val = {
                demo: {
                    value: 'hahha'
                }
            }
            expect(streamFilter(streamIn, val)).toBe(streamIn)
        })
    })
    describe('path in object', function () {
        it('should equal  null', function () {
            const streamIn = {
                path: "demo.value",
                alias: {
                    value: "id",
                    name: "value"
                }
            }
            const val = {
                demo: {
                    value: 'hahha'
                }
            }
            expect(streamFilter(streamIn, val)).toBe("hahha")
        })
    })
    describe('alias in object', function () {
        it('should equal  null', function () {
            const streamIn = {
                path: "demo.value",
                alias: {
                    id: "value",
                    value: "name"
                }
            }
            const val = {
                demo: {
                    value: [
                        {
                            value: 1,
                            name: '蔡俊雄'
                        },
                        {
                            value: 1,
                            name: '蔡俊雄'
                        },
                        {
                            value: 1,
                            name: '蔡俊雄'
                        }
                    ]
                }
            }
            expect(streamFilter(streamIn, val)).toHaveLength(3)
        })
    })
})