module.exports = {
    dragonTreasure: async(req, res) => {
        const db = req.app.get('db');

        const dragonTreasure = await db.get_dragon_treasure(1);
        res.status(200).send(dragonTreasure);
    },
    getUserTreasure: async(req, res) => {
        const { id } = req.session.user,
              db = req.app.get('db');

        const getUserTreasure = await db.get_user_treasure(id)
        res.status(200).send(getUserTreasure)
    },
    addUserTreasure: (req, res) => {

    },
    getAllTreasure: (req, res) => {

    },
}