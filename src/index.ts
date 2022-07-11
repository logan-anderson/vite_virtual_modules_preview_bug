/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { createServer, build as viteBuild, InlineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createPlugin } from './plugin'

let config: InlineConfig = {
  server: {
    force: true,
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      TINA_IMPORT: path.join(process.cwd(), '.tina', 'schema'),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: path.resolve(process.cwd(), 'out'),
  },
  plugins: [react, createPlugin()],
}

export const createViteServer = async () => {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    ...config,
    server: {
      port: 3000,
    },
  })
  await server.listen()

  server.printUrls()
}

type Awaited<T> = T extends PromiseLike<infer U> ? U : T
type TempUnion = Awaited<ReturnType<typeof viteBuild>>
type TempType = Extract<TempUnion, { output: Array<any> }>


export const build = async () => {
  const out = (await viteBuild(config)) as TempType
}

// Uncomment this to see that building works
// build().then(()=>{
//     console.log('done')
// })

createViteServer().then(()=>{
    console.log('done')
})
