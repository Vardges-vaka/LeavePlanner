---
name: Backend Improvements Review
overview: Comprehensive review of the backend architecture identifying security gaps, bugs, missing production features, and code quality improvements -- prioritized by severity.
todos:
  - id: p1-security
    content: "Fix critical security issues: real SESSION_SECRET + separate JWT_SECRET, add Helmet, add rate limiting, add DB name to URI"
    status: completed
  - id: p2-bugs
    content: "Fix bugs: globalResponses imports, circular dep, 202 status code, NODE_ENV duplication, dotenv called 4x"
    status: completed
  - id: p3-production
    content: "Production readiness: connect-mongo session store, global error handler, 404 handler, request logging, graceful shutdown"
    status: completed
  - id: p4-quality
    content: "Code quality: rename uresRoutes, remove unused SESSION_EXPIRY, fix controller catch blocks, add try/catch to dataVld_mw"
    status: completed
isProject: false
---

# Backend Review and Recommendations

---

## PRIORITY 1: Security (Critical)

### 1a. SESSION_SECRET is still a placeholder

[backEnd/.env](backEnd/.env) line 2: `SESSION_SECRET=your-secret-key`. This is used to sign both session cookies AND JWTs. Anyone who knows this string can forge sessions and tokens. Generate a proper random secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Also add a separate `JWT_SECRET` env var -- session signing and JWT signing should use different keys.

### 1b. Helmet is installed but not used

You have `helmet@8.1.0` in `package.json` but it's never imported. Helmet sets 15+ security headers automatically (CORS, XSS, HSTS, etc.). Your manual `setCSPHeader` middleware only covers CSP. Replace it with Helmet in [backEnd/server.js](backEnd/server.js):

```javascript
import helmet from "helmet";
app.use(helmet());
```

### 1c. Rate limiting is installed but not used

`express-rate-limit@8.2.1` is installed but not applied. Auth routes (`/signup`, `/login`) are wide open to brute-force attacks. Add rate limiting in [backEnd/03_middlewares/](backEnd/03_middlewares/):

```javascript
import rateLimit from "express-rate-limit";
export const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 15 });
```

Apply to signup/login routes in [backEnd/02_routes/uresRoutes.js](backEnd/02_routes/uresRoutes.js).

### 1d. No MongoDB database name

[backEnd/.env](backEnd/.env) line 9: the `MONGODB_URI` has no database name -- Mongoose will use the `test` database by default. Append your DB name:

```
MONGODB_URI=mongodb+srv://...mongodb.net/leavePlanner?appName=eventPlanner
```

---

## PRIORITY 2: Bugs to Fix

### 2a. globalResponses.js still imports from old debugging/

[backEnd/06_helpers/globalResponses.js](backEnd/06_helpers/globalResponses.js) line 1 imports from the old debugging module:

```javascript
import { debug_msg } from "./debugging/console_msg.js";
```

Should import from the new logger:

```javascript
import { debug_msg } from "./logging/logger.js";
```

### 2b. Circular import in globalResponses.js

`globalResponses.js` imports `consoleLog` from `_helpers.index.js`, which re-exports from `globalResponses.js`. This circular dependency works by accident but is fragile. Fix: import directly from `./logging/logger.js`.

### 2c. Wrong HTTP status for failed operations

[backEnd/06_helpers/globalResponses.js](backEnd/06_helpers/globalResponses.js) line 13 sends `202` for failed operations. HTTP 202 means "Accepted" (request queued for async processing). Business logic failures should return `400` (Bad Request).

### 2d. Duplicate NODE_ENV sources

- [backEnd/CONFIGURATIONS/serverConfig.js](backEnd/_CONFIGURATIONS/serverConfig.js): reads `NODE_ENV` from CLI args, defaults to `"development"`
- [backEnd/CONFIGURATIONS/sessionConfig.js](backEnd/_CONFIGURATIONS/sessionConfig.js): reads `process.env.NODE_ENV` from `.env`

Two different `NODE_ENV` values can coexist. Unify to one source: `process.env.NODE_ENV`.

### 2e. dotenv.config() called 4 times

`dotenv.config()` is called in `serverConfig.js`, `sessionConfig.js`, `encryptionConfig.js`, and `dbConfig.js`. It should only be called ONCE, at the very top of `server.js` (before any config imports).

---

## PRIORITY 3: Production Readiness

### 3a. Session store uses MemoryStore

`express-session` defaults to `MemoryStore` -- it leaks memory over time and doesn't work across multiple server instances. Install `connect-mongo` and use MongoDB as the session store:

```javascript
import MongoStore from "connect-mongo";
session({ store: MongoStore.create({ mongoUrl: MONGODB_URI }), ... })
```

### 3b. No global error handler

If any middleware or route throws an unhandled error, Express returns a raw HTML 500 page. Add a global error handler as the LAST `app.use()` in [backEnd/server.js](backEnd/server.js):

```javascript
app.use((err, req, res, next) => {
  logger.error(err);
  res
    .status(500)
    .json({ success: false, message: "Internal server error", data: null });
});
```

### 3c. No 404 handler

Unknown routes get Express's default HTML 404. Add before the error handler:

```javascript
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found", data: null });
});
```

### 3d. No request logging

No HTTP request logging at all. Add a request logger middleware (use Winston or a simple custom one) to log method, URL, status code, and response time for every request.

### 3e. No graceful shutdown

If the process receives SIGTERM (e.g. during deployment), it dies immediately -- open DB connections and in-flight requests are abandoned. Add graceful shutdown in `server.js`:

```javascript
process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  server.close(() => process.exit(0));
});
```

---

## PRIORITY 4: Code Quality

### 4a. Route file typo

`uresRoutes.js` should be `userRoutes.js`. The barrel export in [backEnd/02_routes/routes.index.js](backEnd/02_routes/_routes.index.js) references it as `uresRoutes.js`.

### 4b. Unused SESSION_EXPIRY constant

[backEnd/CONFIGURATIONS/serverConfig.js](backEnd/_CONFIGURATIONS/serverConfig.js) exports `SESSION_EXPIRY` but nothing uses it. `GLOBAL_SESSION_EXPIRY` from `sessionConfig.js` is the one actually used. Remove the dead code.

### 4c. Controller catch blocks swallow errors

Every controller has this pattern:

```javascript
} catch (error) {
  DEBUG_LOG(debug_msg.error_E, error);
  // No return! The response hangs.
}
```

If the service throws, the error is logged but no response is sent -- the client times out. Fix: return a 500 response in every catch block.

### 4d. dataVld_mw has no try/catch

[backEnd/03_middlewares/dataVld_mw.js](backEnd/03_middlewares/dataVld_mw.js): if the validator function throws an exception (as opposed to returning `{ isValid: false }`), it becomes an unhandled promise rejection. Wrap in try/catch.

---

## Summary Table

| #   | Issue                      | Severity   | Effort |
| --- | -------------------------- | ---------- | ------ |
| 1a  | Placeholder SESSION_SECRET | Critical   | 5 min  |
| 1b  | Helmet not used            | Critical   | 5 min  |
| 1c  | Rate limiting not applied  | Critical   | 15 min |
| 1d  | No DB name in URI          | Critical   | 1 min  |
| 2a  | globalResponses old import | Bug        | 2 min  |
| 2b  | Circular import            | Bug        | 2 min  |
| 2c  | Wrong 202 status           | Bug        | 1 min  |
| 2d  | Duplicate NODE_ENV         | Bug        | 10 min |
| 2e  | dotenv called 4x           | Bug        | 10 min |
| 3a  | MemoryStore sessions       | Production | 15 min |
| 3b  | No global error handler    | Production | 10 min |
| 3c  | No 404 handler             | Production | 5 min  |
| 3d  | No request logging         | Production | 15 min |
| 3e  | No graceful shutdown       | Production | 10 min |
| 4a  | uresRoutes typo            | Quality    | 5 min  |
| 4b  | Unused SESSION_EXPIRY      | Quality    | 2 min  |
| 4c  | Controllers swallow errors | Quality    | 15 min |
| 4d  | dataVld_mw no try/catch    | Quality    | 5 min  |

Total estimated effort: ~2 hours if we implement everything.

---

## What You're Doing Well

- Modular file structure with barrel exports -- easy to navigate and scale
- Separation of concerns: validators, controllers, services are cleanly split
- Access code system with bcrypt hashing and used-code tracking is solid
- Dual auth strategy (JWT cookie + session) with blacklisting
- i18n on both frontend and backend with 4 languages
- Winston logger with file rotation
- Role-based access control middleware
