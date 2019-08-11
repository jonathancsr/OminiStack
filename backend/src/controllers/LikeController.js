const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {

        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(devId);
        const targetDev = await Dev.findById(user);

        if (!targetDev) {
            return res.status(400).json({ error: "Dev not exists" })
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log("Deus match")
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}