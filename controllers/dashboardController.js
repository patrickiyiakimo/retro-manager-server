const pool = require("../config/db");
require("dotenv").config();


const dashboard = async (req, res) => {
    try {
        const { dashboard_id } = req.params
        
        await pool.query ()
    } catch (error) {
        console.error(error.message)
        res.sendStatus(400) //Bad request
    }
}