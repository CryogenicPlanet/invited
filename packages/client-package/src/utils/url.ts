const serverUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://invited.vercel.app'
    : 'http://localhost:3000'
export { serverUrl }
