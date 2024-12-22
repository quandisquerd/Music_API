const postgre = require('../database')
const albumController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query("select * from albums")
            res.json({ msg: "OK", data: rows })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    add: async (req, res) => {
        const { name} = req.body;
        try {
            const query = `
        INSERT INTO albums (name)
        VALUES ($1)
        RETURNING *`;
            const values = [name];
            const result = await postgre.query(query, values);
            res.json({ msg: 'Added new album', data: result.rows[0] });
        } catch (error) {
            res.json({ msg: error.message });
        }
    }
}

module.exports = albumController