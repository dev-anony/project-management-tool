import Dev from '../models/Users.js';
import Board from '../models/Board.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await Dev.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const foundUser = await Dev.findById(id);
        if (foundUser) {
            res.status(200).json(foundUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await Dev.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const [updated] = await Dev.updateOne({ name, email }, { _id: id });
        if (updated) {
            const updatedUser = await Dev.findById(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Dev.findByIdAndDelete(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
};

export const removeDevFromBoards = async (req, res) => {
    try {
    const { adminId, devId, boardId } = req.body;

    // check admin exists
    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found'
      });
    }

    // verify admin permission
    if (!admin.isAdmin) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    // remove developer from board
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      {
        $pull: {
          developers: devId
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      board: updatedBoard
    });
    } catch (error) {
        console.error('Error removing dev from boards:', error);
    }
};


