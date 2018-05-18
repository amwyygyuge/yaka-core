// 大多数测试并不关心 CSS 文件里的内容
// 所以这里我们直接返回一个空的对象
module.exports = {
    process() {
      return 'module.exports = {};'
    },
    getCacheKey() {
      // The output is always the same.
      return 'css-cache'
    }
  }