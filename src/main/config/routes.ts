import { Express, Router } from 'express'
import { readdirSync, statSync } from 'fs'
import path from 'path'

const importRoutes = (app: Express, prefix?: string, router?: Router): Router => {
  const expressRouter = router ?? Router()
  app.use(prefix ?? '/', expressRouter)
  readdirSync(prefix ?? path.join(__dirname, '/../routes')).map(async file => {
    const newPrefix = prefix ? `${prefix}/${file}` : path.join(__dirname, '/../routes/' + file)
    const stats = statSync(newPrefix)
    if (stats.isDirectory()) {
      importRoutes(app, newPrefix, expressRouter)
    }
    if (stats.isFile()) {
      const routeFile = await import(newPrefix ?? path.join('../routes/', file))
      routeFile.default(expressRouter)
    }
  })
  return expressRouter
}

const setupPrefix = (app: Express): void => {
  const router = importRoutes(app)
  app.use('/brain', router)
}

export default setupPrefix
