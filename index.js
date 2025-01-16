import app from './app.js'
import { MONGODB_URI, PORT }  from './utils/config.js'
import { info, error } from './utils/logger.js'


app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})