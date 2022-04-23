const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  configureWebpack: {
    devtool: 'nosources-source-map'
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('root', resolve('./'))
    // define
    // config.plugin('define')
    //   .tap(args => {
    //     return args
    //   })
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true, // will remove in the future
      // customFileProtocol: 'ink://./',
      externals: ['ink'],
      chainWebpackMainProcess: config => {
        config.resolve.alias
          .set('@', resolve('src'))
          .set('root', resolve('./'))
      },
      builderOptions: {
        productName: 'Smoke',
        appId: 'ink.sake.smoke',
        
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: 'public/icon.icns',
          extendInfo: {
            LSUIElement: 1
          },
          target: [{
            target: 'dmg',
            arch: [
              'x64',
              'arm64'
            ]
          }],
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: '${productName}-${version}-${arch}.dmg'
        },
        win: {
          icon: 'public/icon.ico',
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: '${productName}-${version}-${arch}.exe',
          target: [{
            target: 'nsis',
            arch: [
              'x64',
              'ia32'
            ]
          }]
        },
        nsis: {
          shortcutName: 'ink',
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        linux: {
          // icon: 'public/'
        },
        
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  config.configureWebpack = {
    devtool: 'source-map'
  }
  // for dev main process hot reload
  config.pluginOptions.electronBuilder.mainProcessWatch = ['src/main/**/*']
}

module.exports = defineConfig({
  ...config,
  transpileDependencies: true,
  // publicPath: '/',
  // assetsDir: 'assets'
})
