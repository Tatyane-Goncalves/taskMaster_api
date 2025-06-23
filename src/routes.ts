import { Router, Request, Response, NextFunction }  from "express"

const router = Router()

const tasks = ["Estudar Node JS", "Estudar TypeScript"]


function checkTask(req: Request, res: Response, next: NextFunction)  {
  if (!req.body.title) {
    return res.status(400).json({ error: "Título inválido / Faltando título"})
  }

  return next()
}


// Listar todas as tarefas
router.get("/tasks", (req: Request, res: Response) => {

  res.json(tasks)
})

// Listar tarefa única
router.get("tasks/:id", (req: Request, res: Response) => {
  const id: any = req.params.id 

  res.json({ tarefas: tasks[id]})
})


// Criar tarefas
router.post("/task", checkTask, (req: Request, res: Response) => {
  const { title } = req.body


  tasks.push(title)
  

  res.json({ message: "tarefa criada com sucesso!"})

})

// Atualizar tarefa
router.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params
  const { title } = req.body

  tasks[Number(id)] = title

  res.json({ message: "Tarefa atualizada com sucesso!"})

})


// Deletar tarefa
router.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params

  tasks.splice(Number(id), 1)

  res.json({ message: "Tarefa deletada com sucesso!"})

}) 


export { router }