module.exports = {
    dragonTreasure: async(req, res) => {
        const db = req.app.get('db');

        const dragonTreasure = await db.get_dragon_treasure(1);
        res.status(200).send(dragonTreasure);
    },
    getUserTreasure: async(req, res) => {
        const { id } = req.session.user,
              db = req.app.get('db');

        const getUserTreasure = await db.get_user_treasure(id);
        res.status(200).send(getUserTreasure);
    },
    addUserTreasure: async(req, res) => {
        const { treasureURL } = req.body,
              { id } = req.session.user,
              db = req.app.get('db');

        const userTreasure = await db.add_user_treasure(treasureURL, id);
        res.status(200).send(userTreasure);
    },
    getAllTreasure: async(req, res) => {
        const db = req.app.get('db');

        const allTreasure = await db.get_all_treasure();
        res.status(200).send(allTreasure);
    },
}