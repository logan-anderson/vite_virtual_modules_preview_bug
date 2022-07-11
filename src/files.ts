export const virtualPrefix = 'virtual:module'

export const indexHtml = () => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="${virtualPrefix}/main.tsx"></script>
      </body>
    </html>
    `
}

export const virtualMain = () => {
  return `import React from 'react'
    import ReactDOM from 'react-dom'
    import App from '${virtualPrefix}/app.tsx'
    
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )
    `
}

export const virtualApp = () => {
  return `import React from 'react'
    
    function App() {
      return (
        <div>
          Hello World!!
        </div>
      )
    }
    
    export default App    
      `
}
