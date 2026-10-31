# Reach — Responsive website + Google Sheets

A responsive contact-form website built with HTML, CSS and vanilla JavaScript. Form submissions are sent to Google Apps Script and appended to a Google Sheet.

## Project files

- `index.html` — website structure
- `style.css` — responsive styling
- `script.js` — validation and form submission
- `Code.gs` — Google Apps Script backend

## Part 1 — Connect Google Sheets

1. Create a new Google Sheet.
2. In the sheet, open **Extensions → Apps Script**.
3. Remove the starter code and paste all the contents of `Code.gs`.
4. Save the Apps Script project.
5. Click **Deploy → New deployment**.
6. Select the gear icon / deployment type **Web app**.
7. Set **Execute as** to **Me**.
8. Set **Who has access** to **Anyone** (if this option is available and appropriate for your account).
9. Click **Deploy**, authorize the requested permissions, and copy the Web app URL. It normally ends in `/exec`.
10. Open `script.js` and replace:
   `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
   with your copied URL. Keep the URL inside the quotation marks.

The script creates a tab called **Form Responses** and adds a header row automatically on the first submission.

### Important deployment notes

- Use the deployed `/exec` URL, not the Apps Script editor URL or a `/dev` test URL.
- If you edit `Code.gs` after deploying, create a new version using **Deploy → Manage deployments → Edit → New version → Deploy**.
- The browser uses `no-cors` for a simple form POST. The browser cannot read the Apps Script response, so the on-page success message means the request was sent, not that the sheet write was independently confirmed. Test by submitting a sample and checking the sheet.
- The web app endpoint is public when deployed with access set to Anyone. Do not collect passwords, payment details, or sensitive personal information. Add stronger spam protection or authentication before using this for high-volume or sensitive workflows.
- Apps Script quotas and Google account access policies apply.

## Part 2 — Test locally

You can open `index.html` in a browser, or use the VS Code Live Server extension. Submit a test entry and confirm that it appears in the Google Sheet.

## Part 3 — Upload to GitHub

1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
3. Keep `Code.gs` in the repository for your project documentation, or store it separately in Apps Script. It is not executed by Vercel.
4. Commit and push the files.

## Part 4 — Deploy on Vercel

1. Sign in to Vercel using GitHub.
2. Click **Add New → Project**.
3. Import your website repository.
4. For this plain HTML/CSS/JS project, leave the framework preset as **Other**.
5. Leave the build command and output directory empty/default; there is no build step.
6. Click **Deploy**.
7. Open the generated Vercel URL and submit a test form.
8. Check your Google Sheet for the new row.

Whenever you push website changes to the connected GitHub branch, Vercel can redeploy automatically.
