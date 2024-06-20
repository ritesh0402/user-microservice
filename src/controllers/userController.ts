import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'shhhh dont tell anyone';

export const signup = async (req: Request, res: Response) => {
   const { name, mobile, email, password } = req.body;
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, mobile, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json(newUser);
   } catch (err) {
      res.status(500).json({ error: err });
   }
};

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
   } catch (err) {
      res.status(500).json({ error: err });
   }
};

export const updateUser = async (req: Request, res: Response) => {
   const { userId } = req.params;
   const updates = req.body;
   try {
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!updatedUser) {
         return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
   } catch (err) {
      res.status(500).json({ error: err });
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   const { userId } = req.params;
   try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
         return res.status(404).json({ error: 'User not found' });
      }
      res.json(deletedUser);
   } catch (err) {
      res.status(500).json({ error: err });
   }
};

export const listUsers = async (req: Request, res: Response) => {
   try {
      const users = await User.find();
      res.json(users);
   } catch (err) {
      res.status(500).json({ error: err });
   }
};

export const searchUser = async (req: Request, res: Response) => {
   const { name } = req.query;
   try {
      const users = await User.find({ name: new RegExp(name as string, 'i') });
      res.json(users);
   } catch (err) {
      res.status(500).json({ error: err });
   }
};
