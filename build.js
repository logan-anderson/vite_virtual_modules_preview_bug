require('esbuild').buildSync({
    entryPoints: ['src/index.ts'],
    bundle: true,
    external: ['./node_modules/*'],
    platform: 'node',
    outfile: 'out.js',
})