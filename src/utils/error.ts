export const throwError = (error) => {
  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
    if (error?.message) {
      throw new Error(error.message)
    } else {
      throw error
    }
  }
}
