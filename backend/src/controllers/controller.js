export function getHandler(req, res) {
    res.status(200).send('this is get api endpoint');
}

export function postHandler(req, res) {
    res.status(201).json({ message: "this is post api endpoint" });
}

export function putHandler(req, res) {
    res.status(200).json({ message: "this is put api endpoint" });
}

export function deleteHandler(req, res) {
    res.status(200).json({ message: "this is delete api endpoint" });
}