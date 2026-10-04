import db from "../config/database.js";

// using the GET enpoint retrieves the locations from the locations table.
export async function getAllLocations(req, res) {
    try { 
        const [rows] = await db.execute("SELECT * FROM locations");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch locations" });
    }
};  

// using the POST endpoint adds a new location to the locations table.
export async function createLocation(req, res) {
    try {
        const { team_id, location_name, is_active = true } = req.body;
        if (!team_id || !location_name) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const [result] = await db.execute(
            "INSERT INTO locations (team_id, location_name, is_active) VALUES (?, ?, ?)",
            [team_id, location_name, is_active]
        );
        res.status(201).json({ message: "Location created", locationId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create location" });
    }
}   

// using the PUT endpioint to allow locations to be updated. 
export async function updateLocation(req, res) {
    try {
        const { team_id, location_name, is_active } = req.body;
        if (!team_id || !location_name || typeof is_active !== "boolean") {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const [result] = await db.execute(
            "UPDATE locations SET team_id = ?, location_name = ?, is_active = ? WHERE location_id = ?",
            [team_id, location_name, is_active, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json({ message: "Location updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update location" });
    }
}   

// using the DELETE endpoint to allow locations to be deleted from the locations table.
export async function deleteLocation(req, res) {
    try {
        const [result] = await db.execute(
            "DELETE FROM locations WHERE location_id = ?",
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json({ message: "Location deleted" });
    } catch (error) {
        console.error(error);
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({ error: "Cannot delete location with existing assignments" });
        }
        res.status(500).json({ error: "Failed to delete location" });
    }
}           