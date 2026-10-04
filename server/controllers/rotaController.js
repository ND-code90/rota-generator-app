import db from "../config/database.js";

export async function getAllRota(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM rotas");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rotas" });
  }
};

export async function getRotaById(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM rotas WHERE rota_id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Rota not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rotas" });
  }
};

export async function createRota(req, res) {
  try {
    const {team_id, rota_start_date, rota_end_date} = req.body;
    if (!team_id || !rota_start_date || !rota_end_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [result] = await db.execute(
      "INSERT INTO rotas (team_id, rota_start_date, rota_end_date) VALUES (?, ?, ?)",
      [team_id, rota_start_date, rota_end_date]
    );

    res.status(201).json({ id: result.insertId, team_id, rota_start_date, rota_end_date });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create rota" });
  }
};

export async function updateRota(req, res) {
  try {
    const {team_id, rota_start_date, rota_end_date} = req.body;
    if (!team_id || !rota_start_date || !rota_end_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [result] = await db.execute(
      "UPDATE rotas SET team_id = ?, rota_start_date = ?, rota_end_date = ? WHERE rota_id = ?",
      [team_id, rota_start_date, rota_end_date, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rota not found" });
    }
    res.json({ id: req.params.id, team_id, rota_start_date, rota_end_date });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update rota" });
  }
};

export async function deleteRota(req, res) {
  try {
    const [result] = await db.execute("DELETE FROM rotas WHERE rota_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rota not found" });
    }
     res.status(204).send();
  } catch (error) {
    console.error(error);
    if(error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({ error: "Cannot delete rota as it is referenced in another table" });
  }
  res.status(500).json({ error: "Failed to delete rota" });
  }
};

export async function removeStaffFromRota(req, res) {
  try {
    const { rotaId, assignmentId } = req.params;
    const [result] = await db.execute(
      "UPDATE rota_assignments SET staff_member_id = NULL WHERE rota_id = ? AND assignment_id = ?",      [rotaId, assignmentId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rota assignment not found" });
    }
    res.json({ message: "Staff removed from rota assignment successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove staff from rota assignment" });
  }
};

// the prupose is to show all assignments belonging to the rota. 
export async function getAssignmentsForRota(req, res) {
  try {
    const [rows] = await db.execute(
      `SELECT *
       FROM rota_assignments
       WHERE rota_id = ?
       ORDER BY assignment_date, assignment_id`,
      [req.params.rotaId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch rota assignments"
    });
  }
}

export async function createAssignment(req, res) {
  try {
    const { assignment_date, activity_id, location_id, staff_member_id = null } = req.body;

    if (!assignment_date || !activity_id || !location_id) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    const [result] = await db.execute(
      `INSERT INTO rota_assignments (
        rota_id,
        assignment_date,
        activity_id,
        location_id,
        staff_member_id
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        req.params.rotaId,
        assignment_date,
        activity_id,
        location_id,
        staff_member_id
      ]
    );

    res.status(201).json({
      assignment_id: result.insertId,
      rota_id: Number(req.params.rotaId),
      assignment_date,
      activity_id,
      location_id,
      staff_member_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create rota assignment"
    });
  }
}

export async function assignStaffToAssignment(req, res) {
  try {
    const { staff_member_id } = req.body;
    const { rotaId, assignmentId } = req.params;

    if (!staff_member_id) {
      return res.status(400).json({
        error: "Staff member ID is required"
      });
    }

    const [result] = await db.execute(
      `UPDATE rota_assignments
       SET staff_member_id = ?,
           assignment_source = 'manual'
       WHERE rota_id = ? AND assignment_id = ?`,
      [staff_member_id, rotaId, assignmentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Rota assignment not found"
      });
    }

    res.json({
      message: "Staff member assigned successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to assign staff member"
    });
  }
}