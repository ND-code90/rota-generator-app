import db from "../config/database.js";

export async function deleteStaffMember(req, res) {
  try {
    const [result] = await db.execute("DELETE FROM staff_members WHERE staff_member_id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    res.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error(error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({ error: "Cannot delete staff member as they are referenced in another table" });
    }
    res.status(500).json({ error: "Failed to delete staff member" });
  }
}

export async function updateStaffMember(req, res) {
  try {
    const {
      team_id,
      role_id,
      staff_name,
      is_active,
      flexible_working
    } = req.body;

    // For a PUT request, send the complete set of staff details.
    if (
      !team_id ||
      !role_id ||
      !staff_name ||
      typeof is_active !== "boolean" ||
      typeof flexible_working !== "boolean"
    ) {
      return res.status(400).json({ error: "Missing or invalid required fields" });
    }

    const [result] = await db.execute(
      `UPDATE staff_members
       SET team_id = ?,
           role_id = ?,
           staff_name = ?,
           is_active = ?,
           flexible_working = ?
       WHERE staff_member_id = ?`,
      [
        team_id,
        role_id,
        staff_name,
        is_active,
        flexible_working,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    res.json({
      id: Number(req.params.id),
      team_id,
      role_id,
      staff_name,
      is_active,
      flexible_working
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update staff member" });
  }
}