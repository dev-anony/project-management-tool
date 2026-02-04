import team from '../models/Team.js';

export const getTeams = async (req, res) => {
    try {
        const teams = await team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createTeam = async (req, res) => {
    const teamData = req.body;
    const newTeam = new team(teamData);
    try {
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateTeam = async (req, res) => {
    const { id } = req.params;
    const teamData = req.body;  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No team with id: ${id}`);

    const updatedTeam = await team.findByIdAndUpdate(id, teamData, { new: true });

    res.json(updatedTeam);
};

export const deleteTeam = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No team with id: ${id}`);
    await team.findByIdAndRemove(id);
    res.json({ message: "Team deleted successfully." });
};

export const getTeamById = async (req, res) => {
    const { id } = req.params;
    try {
        const teamData = await team.findById(id);
        res.status(200).json(teamData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getTeamsByCol = async (req, res) => {
    const { col } = req.params;
    try {
        const teams = await team.find({ col: col });
        res.status(200).json(teams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
