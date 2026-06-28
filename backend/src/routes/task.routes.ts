import { Router } from "express"
import { TaskRepository } from "~/repositories/task.repository"
import { TaskService } from "~/services/task.service"
import { TaskHandler } from "~/handlers/task.handler"
import { validate } from "~/middleware/validate"
import { createTaskSchema, updateTaskSchema } from "~/schemas/task.schema"

const repository = new TaskRepository()
const service = new TaskService(repository)
const handler = new TaskHandler(service)

const router = Router()

router.get("/", handler.list)
router.get("/:id", handler.getById)
router.post("/", validate(createTaskSchema), handler.create)
router.put("/:id", validate(updateTaskSchema), handler.update)
router.delete("/:id", handler.delete)

export default router
