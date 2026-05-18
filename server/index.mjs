import { createAppServer } from "./app.mjs"

const port = Number(process.env.PORT || 8787)
createAppServer().listen(port, () => {
  console.log(`Kaires serverless API listening on http://localhost:${port}`)
})
