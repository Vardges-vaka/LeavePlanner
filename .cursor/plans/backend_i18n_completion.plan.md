---
name: Backend i18n Completion
overview: Replace all 18 hardcoded English strings across the backend with i18n translation keys, add missing keys to all 4 locale files, and fix the auth_mw error leak.
todos:
  - id: i18n-keys
    content: Add missing translation keys (common.route_not_found, common.internal_server_error, common.authenticated, etc.) to all 4 locale files
    status: pending
  - id: i18n-strings
    content: Replace all 18 hardcoded strings across server.js, controllers, services, validators, middlewares, and routes with req.t() calls
    status: pending
isProject: false
---

# Backend i18n Completion

Replace every hardcoded English string with `req.t()` calls, add the missing translation keys, and fix the `auth_mw` error message leak.

---

## 1. Add missing translation keys to all 4 locales

Add these keys to [backEnd/05_i18n/locales/{en,ar,hi,ru}/translation.json](backEnd/05_i18n/locales/en/translation.json):

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

---

## 2. Files to update (18 hardcoded strings)

| File                              | Change                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------- |
| **server.js** (404 handler)       | `"Route not found"` -> `req.t("common.route_not_found")`                      |
| **server.js** (error handler)     | `"Internal server error"` -> `req.t("common.internal_server_error")`          |
| **userRoutes.js** (/me)           | `"Authenticated"` -> `req.t("common.authenticated")`                          |
| **4x controllers** (catch blocks) | `"Internal server error"` -> `req.t("common.internal_server_error")`          |
| **user_srv_createUser.js**        | `"Access document not found"` -> `req.t("auth.access_doc_not_found")`         |
| **4x validators** (Payload check) | `"Payload is required"` -> `req.t("validation.payload_required")`             |
| **4x validators** (catch)         | `"Validation error"` -> `req.t("validation.validation_error")`                |
| **dataVld_mw.js** (catch)         | `"Validation error"` -> `req.t("validation.validation_error")`                |
| **rateLimiter_mw.js**             | Switch from static `message` to function-based `message: (req) => req.t(...)` |
| **auth_mw.js** (catch)            | `error.message` -> `req.t("common.internal_server_error")` (prevents leak)    |

---

## 3. Rate limiter special case

`express-rate-limit` supports a function for `message`:

```javascript
message: (req) => ({
  success: false,
  message: req.t("auth.too_many_attempts"),
  data: null,
});
```

This gives us access to `req.t()` at request time rather than config time.
