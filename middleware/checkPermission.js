const jwt = require('jsonwebtoken')
const postgre = require('../database')
const checkPermission = {
    check: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                return res.json({ message: "Ban chua dang nhap" });
            }
            const decoded = jwt.verify(token, 'bo_quan')
            const query = `SELECT * FROM users WHERE id = ${decoded.id}`
            const result = await postgre.query(query)
            const user = result.rows[0]
            if (!user || user.role !== 'admin') {
                return res.json({ message: 'Cút' })
            }
            next()
        } catch (err) {
            return res.status(500).json({ message: 'Loi api', msg: err.message })
        }
    }
}
module.exports=checkPermission