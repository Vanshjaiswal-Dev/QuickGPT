import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'

const app = express()

await connectDB()

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('Server is Live!'))

// Health check endpoint
app.get('/api/health', (req, res) => {
  const envCheck = {
    mongodb: !!process.env.MONGODB_URI,
    jwt: !!process.env.JWT_SECRET,
    image_generation: 'Pollinations.ai (no API key required)',
    client_url: process.env.CLIENT_URL || 'not set'
  };
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: envCheck
  });
});

app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler (must be last)
app.use((err, req, res, next) => {
  console.error('Error handler:', err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
