**Student-Dash — Moodle Student Dashboard**
--------------------------------------------

Student-Dash is a Moodle local plugin that provides students with a consolidated, modern dashboard (React frontend + Moodle backend) showing courses, tasks (assignments & quizzes), schedules (calendar events), exams, Zoom recordings and personal activities. The plugin includes demo utilities (event seeding) and a scheduled task to send exam reminder emails.

## Key Features
----------------
- **Centralized view:** Aggregate student-relevant data — enrolled courses, instructors/practitioners, assignments/quizzes, calendar events, exams and Zoom recordings.
- **Personal activities API:** Create, read, update and delete personal tasks via AJAX.
- **Exam management:** Stores exam entries and runs a scheduled task to email students ahead of exam dates (7, 3 and 1 day reminders).
- **React frontend:** A Create React App located at `frontend/dashboard` for a responsive UI. Supports dev server (localhost:3000) and production build embedding via `templates/dashboard.mustache`.
- **Utilities:** `populate_events.php` for seeding demo lecture and practice events across courses.
- **Email integration:** Optional SendGrid integration (set API key securely) used by the scheduled task in `classes/task/send_exam_alerts_task.php`.

## Repository layout (important files)
- `dashboard.php` — plugin page entrypoint (renders `local_studentdash/dashboard` template).
- `lib.php` — integrates plugin into navigation.
- `version.php` / `settings.php` — plugin metadata and admin settings stub.
- `templates/dashboard.mustache` — HTML template that includes React build assets (production) or an iframe for development.
- `ajax/fetch_data.php` — main AJAX endpoint exposing grades, courses, tasks, events, exams, zoom records and handling POST/PATCH/DELETE for personal activities and zoom records.
- `ajax/fetch_user_data.php` — simple user info endpoint.
- `populate_events.php` — admin script to seed demo events across courses (useful for testing).
- `classes/task/send_exam_alerts_task.php` — scheduled task that sends exam reminders via SendGrid (replace placeholder API key).
- `frontend/dashboard` — React app (Create React App), run `npm install`, `npm run build`.
- `lang/en/local_studentdash.php` — language strings.
- `additional files/primary.php` — optional replacement for Moodle navigation renderable (project includes instructions to swap for menu integration).

## Requirements
----------------
- Moodle (plugin targeted for Moodle 4.1+ as declared in `version.php`).
- PHP and Moodle server prerequisites (see Moodle docs for exact versions).
- Node.js and npm for building the React frontend.
- (Optional) SendGrid account/API key for email reminders (or configure Moodle's outgoing mail).

## Quick install (summary)
--------------------------
- Copy this repository to your Moodle installation under:
  - `{moodleroot}/local/studentdash`
- As Moodle admin, complete plugin installation:
  - Visit Site administration → Notifications
  - Or from CLI:
```bash
php admin/cli/upgrade.php
```
- Frontend development:
- ---------------------
```bash
cd frontend/dashboard
npm install
npm start          # development server at http://localhost:3000
```
- Frontend production:
- -------------------
```bash
cd frontend/dashboard
npm install
npm run build
# postbuild script runs updateHash.js to update the template asset names
```
- Ensure `templates/dashboard.mustache` points to the built assets (the repo uses `updateHash.js` to update filename hashes automatically after `npm run build`).
- Seed demo events (admin only):
  - Purge caches, then in a browser visit:
    - `https://<your-moodle-host>/local/studentdash/populate_events.php`
  - The script creates lecture and practice events for courses for demonstration.

## Configuration
------------------
- SendGrid: open `classes/task/send_exam_alerts_task.php` and replace the placeholder `YOUR REAL SENDGRID API KEY` with your key (do not commit secrets). Alternatively adapt the code to use Moodle's mail API or environment configuration.
- Custom menu: the plugin ships an optional `additional files/primary.php` if you want to modify Moodle's primary navigation. Follow the instructions in `docs/instructions.txt` if you want to replace the core navigation renderable locally (not recommended for production without review).

## AJAX endpoints (summary)
-------------------------
- `ajax/fetch_data.php`
  - GET: fetches user data, grades average, courses with tasks/events/exams/zoom records.
  - POST: accepts `personalActivity` (create personal tasks) and `zoomRecord` (add Zoom recording metadata).
  - PATCH: update Zoom record status.
  - DELETE: delete personal activities by `taskId`.
- `ajax/fetch_user_data.php`
  - GET: returns basic user profile fields for the logged-in user.

## Database and tables
-----------------
- The plugin uses a few custom tables managed at runtime by `ajax/fetch_data.php` helper functions:
  - `personal_activities` — user-created personal tasks.
  - `exams` — exam records (course, date, type, etc.).
  - `zoom_records` — Zoom recording metadata for course recordings.
- Note: For production use, converting these runtime-generated tables to proper XMLDB install/update schemas is recommended (use `db/install.xml` and upgrade scripts) so Moodle's install/upgrade process manages schema changes.

## Security & privacy notes
---------------------------
- The plugin uses Moodle APIs and should respect capabilities and user privacy. Review role checks and data exposure if deploying in a real environment.
- Never commit API keys or other secrets to the repository. Use environment variables or Moodle config for secure keys.
- The demo `primary.php` replacement modifies core navigation and should be used only on test installs or after code review.

## Developer notes
-------------------
- Frontend dev server proxies API calls to `http://localhost:80/` as per `frontend/dashboard/package.json` proxy setting. When running CRA dev server, ensure Moodle is reachable at the proxy address.
- Production UI is embedded via `templates/dashboard.mustache` that references the built JS/CSS in `frontend/dashboard/build/static`.
- `updateHash.js` updates template references after a build so Moodle loads the correct hashed filenames.
