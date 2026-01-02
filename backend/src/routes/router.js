import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('this is get api endpoint');
});

router.post('/', (req, res) => {
    res.status(201).json({ message: "this is post api endpoint" });  
});

router.put('/', (req, res) => {
    res.status(200).json({ message: "this is put api endpoint" });
});

router.delete('/', (req, res) => {
    res.status(200).json({ message: "this is delete api endpoint" });
});

export default router;