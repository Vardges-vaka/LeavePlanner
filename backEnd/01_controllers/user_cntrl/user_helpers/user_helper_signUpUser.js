import bcrypt from "bcryptjs";

const ROLE_MAP = {
  superAdmin: { role: "super_admin", accessLevel: "high" },
  admin: { role: "admin", accessLevel: "medium" },
  user: { role: "user", accessLevel: "low" },
};

/**
 * Tries to match `plainCode` against each role's code list in the Access doc.
 * SuperAdmin: hash-only comparison.
 * Admin/User: hash + assignedEmail comparison.
 * Returns { matched, roleKey, matchIndex } or { matched: false }.
 */
const matchAccessCode = async (newCodes, plainCode, email) => {
  // 1. Check superAdmin codes (no email binding)
  for (let i = 0; i < newCodes.superAdmin.length; i++) {
    const isMatch = await bcrypt.compare(plainCode, newCodes.superAdmin[i]);
    if (isMatch) return { matched: true, roleKey: "superAdmin", matchIndex: i };
  }

  // 2. Check admin codes (email-bound)
  for (let i = 0; i < newCodes.admin.length; i++) {
    const entry = newCodes.admin[i];
    if (entry.assignedEmail !== email) continue;
    const isMatch = await bcrypt.compare(plainCode, entry.hash);
    if (isMatch) return { matched: true, roleKey: "admin", matchIndex: i };
  }

  // 3. Check user codes (email-bound)
  for (let i = 0; i < newCodes.user.length; i++) {
    const entry = newCodes.user[i];
    if (entry.assignedEmail !== email) continue;
    const isMatch = await bcrypt.compare(plainCode, entry.hash);
    if (isMatch) return { matched: true, roleKey: "user", matchIndex: i };
  }

  return { matched: false };
};

export { matchAccessCode, ROLE_MAP };
