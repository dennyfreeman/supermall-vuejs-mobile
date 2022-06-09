module.exports = {
  configureWebpack: {
    resolve: {
      //别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      //  这里不需要设置router和store的路径
      //  因为在之后的引用中都是this.$router和this.$store

      }
    }
  }
}