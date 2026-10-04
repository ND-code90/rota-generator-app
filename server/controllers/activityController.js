import db from "../config/database.js";

//creates the GET endpoint for the activities table.
export async function getAllActivities(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM activities");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch activities"
        });
    }
}   

//creates the POST endpoint to add a new activity to the activities table.
export async function createActivity(req, res) {
    try {
        const {team_id, activity_name, is_full_day = true, priority_number =10, is_active = true} = req.body;
    if (!team_id || !activity_name) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const [result] = await db.execute(
        "INSERT INTO activities (team_id, activity_name, is_full_day, priority_number, is_active) VALUES (?, ?, ?, ?, ?)",
        [team_id, activity_name, is_full_day, priority_number, is_active]
    );
    res.status(201).json({ message: "Activity created", activityId: result.insertId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create activity" });
    }
}

// updates an activity by adding a PUT function.
export async function updateActivity(req, res) {
    try {
        const {team_id, activity_name, is_full_day = true, priority_number =10, is_active = true} = req.body;
        if (!team_id || !activity_name) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const [result] = await db.execute(
            "UPDATE activities SET team_id = ?, activity_name = ?, is_full_day = ?, priority_number = ?, is_active = ? WHERE activity_id = ?",
            [team_id, activity_name, is_full_day, priority_number, is_active, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Activity not found" });
        }
        res.json({ message: "Activity updated", activityId: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update activity" });
    }
}

// deletes an activity by adding a DELETE function.
export async function deleteActivity(req, res) {
    try {
        const [result] = await db.execute(
            "DELETE FROM activities WHERE activity_id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Activity not found" });
        }
        res.status(204).send();
        
        } catch (error) {
            console.error(error);
            if (error.code === "ER_ROW_IS_REFERENCED_2") {
                return res.status(409).json({ error: "Cannot delete activity as it is referenced in other tables" });
            }
            res.status(500).json({ error: "Failed to delete activity" });
        }
    }       
            