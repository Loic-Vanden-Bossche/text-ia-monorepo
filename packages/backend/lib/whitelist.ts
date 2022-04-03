export default (origin, callback) => {
  if (!origin || ['http://localhost:4200', 'http://localhost:8080', 'https://ia-chat.herokuapp.com', 'https://loic-vanden-bossche.github.io'].indexOf(origin) !== -1) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}
