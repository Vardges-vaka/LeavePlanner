---
name: Backend Deep Improvements
overview: "Fix all remaining backend issues: race conditions in Access document operations, error message leaks, i18n completion for all hardcoded strings, schema hardening, and cleanup of dead code."
todos:
  - id: critical-race
    content: "Fix race conditions: make Access document updates atomic using findOneAndUpdate with $pull/$push in signUp and createUser services"
    status: pending
  - id: high-errors
    content: "Fix error message leaks: replace raw error.message with req.t('common.internal_server_error') in service catch blocks and auth_mw"
    status: pending
  - id: high-i18n
    content: "i18n completion: add missing keys to all 4 locale files, replace all 18 hardcoded strings with req.t() calls"
    status: pending
  - id: med-schemas
    content: "Schema hardening: add maxlength/trim to User.js strings, add default:[] to Access.js newCodes arrays"
    status: pending
  - id: med-seed
    content: "Fix seed script: import real Access model, check existing code count before pushing"
    status: pending
  - id: low-cleanup
    content: "Dead code cleanup: delete empty user_helpers, fix cache_mw paths, remove service exports from controller barrel"
    status: pending
isProject: false
---

# Backend Deep Improvements

Covers everything found in the audit, grouped by severity.

---

## Critical: Race Conditions in Access Document

The singleton Access document is read with `findOne()`, modified in memory, then saved with `save()`. Under concurrent requests, two operations can read the same state and one save overwrites the other.

### Affected files

- [user_srv_signUpUser.js](backEnd/01_controllers/user_cntrl/user_srv/user_srv_auth/user_srv_signUpUser.js) -- code matching + splice + save
- [user_srv_createUser.js](backEnd/01_controllers/user_cntrl/user_srv/user_srv_auth/user_srv_createUser.js) -- push + save

### Fix

Replace read-modify-write pattern with atomic MongoDB operations:

**SignUp (code consumption):** After matching a code with bcrypt comparison, use `findOneAndUpdate` with `$pull` to remove the used code and `$push` to add to usedCodes -- all in one atomic operation.

**CreateUser (code generation):** Use `findOneAndUpdate` with `$push` to add the new code directly instead of `findOne()` + `push()` + `save()`.

---

## High: Error Message Leaks

Raw `error.message` is returned to the client in multiple places, which can expose MongoDB internals (E11000 duplicate key text, collection names, field paths).

### Affected files and fix

| File                           | Issue                   | Fix                                                                 |
| ------------------------------ | ----------------------- | ------------------------------------------------------------------- |
| `user_srv_signUpUser.js` catch | Returns `error.message` | Return `req.t("common.internal_server_error")` ; log the real error |
| `user_srv_createUser.js` catch | Returns `error.message` | Same                                                                |
| `user_srv_logInUser.js` catch  | Returns `error.message` | Same                                                                |
| `auth_mw.js` catch             | Returns `error.message` | Return `req.t("common.internal_server_error")`                      |

---

## High: i18n -- Replace All Hardcoded Strings

### New translation keys needed

Add to all 4 locale files ([en](backEnd/05_i18n/locales/en/translation.json), [ar](backEnd/05_i18n/locales/ar/translation.json), [hi](backEnd/05_i18n/locales/hi/translation.json), [ru](backEnd/05_i18n/locales/ru/translation.json)):

```json
{
  "auth": {
    "access_doc_not_found": "Access document not found",
    "too_many_attempts": "Too many attempts, please try again later"
  },
  "validation": {
    "payload_required": "Payload is required",
    "validation_error": "Validation error"
  },
  "common": {
    "route_not_found": "Route not found",
    "internal_server_error": "Internal server error",
    "authenticated": "Authenticated",
    "too_many_requests": "Too many requests, please try again later"
  }
}
```

### 18 string replacements across these files

- **server.js** -- 404 handler + global error handler
- **userRoutes.js** -- `/me` route
- **4 controllers** -- catch blocks
- **user_srv_createUser.js** -- "Access document not found"
- **4 validators** -- "Payload is required" + "Validation error" in each
- **dataVld_mw.js** -- "Validation error" in catch
- **rateLimiter_mw.js** -- switch to function-based `message: (req) => ({ ... req.t(...) })`
- **auth_mw.js** -- catch block

---

## Medium: Schema Hardening

### User.js -- add `maxlength` and `trim`

Add to `firstName`, `lastName`, `middleName` (maxlength: 100), `contactDetails.email` (maxlength: 254), `contactDetails.phone`/`whatsapp` (maxlength: 20), `password` (maxlength: 200). Add `trim: true` on all string fields.

### Access.js -- add defaults for newCodes arrays

```javascript
superAdmin: { type: [String], default: [] },
admin: { type: [...], default: [] },
user: { type: [...], default: [] },
guest: { type: [String], default: [] },
```

This prevents `.push()` from failing on a freshly created Access document where arrays are undefined.

---

## Medium: Seed Script Safety

[scripts/seedAccessCodes.js](backEnd/scripts/seedAccessCodes.js) uses an inline schema that can drift from the real `Access.js` model. Also, running `npm run seed` twice would push 20 codes, exceeding the schema limit of 10.

**Fix:** Import the real `Access` model instead of redefining the schema inline. Check existing code count before pushing, and skip or replace instead of blindly appending.

---

## Low: Dead Code Cleanup

| Item                                         | Action                                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_helpers/_user_cntrl_helpers.index.js`  | Empty file, commented-out import in `user_cntrl.index.js`. Delete the folder.                                                                                       |
| `cache_mw.js` paths `/auth/` and `/profile/` | Routes are under `/api/users/`, so these branches never match. Update or remove.                                                                                    |
| Old `debugging/` folder                      | Superseded by `logging/logger.js`. Already kept as backup per your request.                                                                                         |
| Services exported via `_cntrl.index.js`      | `user_srv_`_ functions leak through the controller barrel. Routes should only import controllers. Remove `export _ from "./user_srv/..."`from`user_cntrl.index.js`. |

---

## Summary by Priority

| Priority                   | Items                            | Est. Effort |
| -------------------------- | -------------------------------- | ----------- |
| Critical (race conditions) | 2 service files                  | 30 min      |
| High (error leaks)         | 4 files                          | 15 min      |
| High (i18n strings)        | 18 replacements + 4 locale files | 30 min      |
| Medium (schema hardening)  | 2 model files                    | 15 min      |
| Medium (seed script)       | 1 file                           | 10 min      |
| Low (dead code)            | 4 items                          | 10 min      |

Total: ~2 hours
