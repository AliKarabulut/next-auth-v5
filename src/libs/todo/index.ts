import { client } from '@/libs/prismadb'

export const getTodoById = async (id: string) => {
  try {
    const todo = await client.todo.findUnique({
      where: {
        id,
      },
    })

    return todo
  } catch {
    return null
  }
}
