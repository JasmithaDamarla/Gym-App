// import express, { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import bodyParser from 'body-parser';
// import mysql from 'mysql2/promise';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: 'your-mysql-host',
//   user: 'your-mysql-user',
//   password: 'your-mysql-password',
//   database: 'your-mysql-database',
// });

// app.post('/register', async (req: Request, res: Response) => {
//   try {
//     const { name, password } = req.body;
//     const connection = await db;

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await connection.query('INSERT INTO users (name, password) VALUES (?, ?)', [name, hashedPassword]);

//     res.json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// app.post('/login', async (req: Request, res: Response) => {
//   try {
//     const { name, password } = req.body;
//     const connection = await db;

//     const [users] = await connection.query('SELECT * FROM users WHERE name = ?', [name]);
//     const user = users[0];

//     if (!user) {
//       return res.status(401).json({ error: 'Authentication failed' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Authentication failed' });
//     }

//     const token = jwt.sign({ userId: user.id, name: user.name, role: user.role }, 'your-secret-key', { expiresIn: '2h' });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// function checkAuth(req: Request, res: Response, next: any) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, 'your-secret-key', (err: any, decoded: any) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     req.userData = decoded;
//     next();
//   });
// }

// app.get('/protected', checkAuth, (req: Request, res: Response) => {
//   res.json({ message: 'Protected route' });
// });

// app.get('/logout', (req: Request, res: Response) => {
//   res.json({ message: 'Logged out successfully' });
// });

// function checkAdmin(req: Request, res: Response, next: any) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   jwt.verify(token, 'your-secret-key', (err: any, decoded: any) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     if (decoded.role !== 1) {
//       return res.status(403).json({ error: 'Forbidden' });
//     }

//     req.userData = decoded;
//     next();
//   });
// }

// app.delete('/deleteTrainer/:trainerId', checkAdmin, async (req: Request, res: Response) => {
//   try {
//     // Implement deletion logic for Trainer account here
//     res.json({ message: 'Trainer account deleted' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Deletion failed' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
