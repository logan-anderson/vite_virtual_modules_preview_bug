import type { Plugin } from 'vite'
import {
  indexHtml,
  virtualApp,
  virtualMain,
  virtualPrefix,
} from './files'
const resolveVirtualFile = (file) => {
  switch (file) {
    case '/main.tsx':
      return virtualMain()
    case '/app':
    case '/app.tsx':
      return virtualApp()
  }
}

export const createPlugin = () => {
  const plug: Plugin = {
    name: 'tina-plugin',
    config: () => {
      return {
        root: `${virtualPrefix}`,
      }
    },
    resolveId(source) {
      if (source.endsWith('.html')) {
        return source // this signals that rollup should not ask other plugins or check the file system to find this id
      }
      if (source.startsWith(virtualPrefix) || source.startsWith(`/${virtualPrefix}`) ) {
        return source // this signals that rollup should not ask other plugins or check the file system to find this id
      }
      return null // other ids should be handled as usually
    },
    load(id) {
      if (id.startsWith(virtualPrefix)) {
        const file = id.replace(virtualPrefix, '')
        return resolveVirtualFile(file)
      }
      if (id.endsWith('.html')) {
        return indexHtml() // the source code for "virtual-module"
      }
      return null // other ids should be handled as usually
    },
    // configureServer(server) {
    //   return () => {
    // server.middlewares.use(async (req, res, next) => {
    //   if (req.url!.startsWith(`/${virtualPrefix}`)) {
    //     const file = req.url!.replace(`/${virtualPrefix}`, '')
    //     res.statusCode = 200
    //     res.setHeader('Content-Type', 'text/javascript')
    //     const trans = await transformWithEsbuild(
    //       resolveVirtualFile(file),
    //       file
    //     )
    //     console.log({ trans })
    //     res.end(trans.code)
    //   }
    //   if (req.url!.endsWith('.html')) {
    //     res.statusCode = 200
    //     res.setHeader('Content-Type', 'text/html')
    //     res.end(indexHtml())
    //   } else {
    //     next()
    //   }
    // })
    //   }
    // },
  }
  return plug
}
