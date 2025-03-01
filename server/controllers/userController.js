import { authenticateUser, registerUser } from '../models/userModel.js'

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' })
  }

  try {
    const result = await authenticateUser(email, password)

    if (result === null) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const { user, token } = result

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      userId: user.id,
      userEmail: user.email,
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

export const signupUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' })
  }

  try {
    const result = await registerUser(email, password)

    if (!result) {
      return res.status(400).json({ success: false, message: 'User already exists' })
    }

    const { user, token } = result

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: user.id,
      userEmail: user.email,
      token
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
