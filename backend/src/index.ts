import express from "express"
import cors from "cors"
import { ResultAsync } from "neverthrow"
import { env } from "~/config/env"
import { connectDB } from "~/config/db"
import { logger } from "~/config/logger"
import { requestId } from "~/middleware/request-id"
import { requestLogger } from "~/middleware/request-logger"
import { errorHandler } from "~/middleware/error-handler"
import taskRoutes from "~/routes/task.routes"

const app = express()

app.use(requestId)
app.use(requestLogger)
app.use(cors())
app.use(express.json())

app.use("/api/tasks", taskRoutes)

app.use(errorHandler)

const start = () => {
  ResultAsync.fromPromise(connectDB(), err => err).match(
    () => {
      app.listen(env.PORT, () => {
        logger.info({ port: env.PORT }, "Server started")
      })
    },
    err => {
      logger.fatal({ err }, "Failed to start server")
      process.exit(1)
    }
  )
}

start()

export { app }
