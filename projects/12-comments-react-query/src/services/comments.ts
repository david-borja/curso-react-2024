export interface Comment {
  title: string
  message: string
  isPreview?: boolean
}

export interface CommentWithId extends Comment {
  id: string
}

export const getComments = async () => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_JSON_PRIVATE_BIN_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-master-key': import.meta.env.VITE_JSON_BIN_API_KEY_MASTER
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments.')
  }

  const json = await response.json()
  return json?.record
}

export const postComment = async (comment: Comment) => {
  const comments = await getComments()

  const id = crypto.randomUUID()
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]
  const response = await fetch(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_JSON_PRIVATE_BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-master-key': import.meta.env.VITE_JSON_BIN_API_KEY_MASTER
    },
    body: JSON.stringify(commentsToSave)
  })

  if (!response.ok) {
    throw new Error('Failed to post comment.')
  }

  return newComment
}