# Ridge Rock Safety Hub

A ready-to-publish GitHub Pages safety portal.

## Uploading to GitHub

1. Create or open your GitHub repository.
2. Upload every file and folder from this project.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save and wait for the GitHub Pages link.

## Weekly Toolbox Talk Update

1. Upload the new PDF into the `toolbox-talks` folder.
2. Open `data.js`.
3. Add one new Toolbox Talk object at the bottom of the `toolboxTalks` list.
4. The talk with the highest number automatically becomes the current talk.
5. Update `lastUpdated` at the top of `data.js`.

Example:

```js
{
  number: 10,
  title: "Personal Protective Equipment",
  category: "PPE",
  description: "Selecting, inspecting, and properly using required PPE.",
  fileName: "Toolbox Talk 010 - Personal Protective Equipment.pdf",
  keywords: "ppe hard hat gloves glasses safety vest",
  active: true
}
```

## Adding a Reporting Form

Open `data.js` and add an object to the `reports` list:

```js
{
  title: "Vehicle Incident Report",
  description: "Report vehicle damage, crashes, or transportation-related events.",
  url: "PASTE-YOUR-MICROSOFT-FORM-LINK-HERE",
  buttonText: "Open Vehicle Report",
  icon: "V",
  theme: "red",
  active: true
}
```

Remove `disabled: true` when the real link is ready.

## Adding a Resource

Add a new object to the `resources` list in `data.js`. This can link to PDFs, Microsoft Forms, SharePoint, OneDrive, or another webpage.

## Important

GitHub Pages is public unless your organization has a private Pages setup. Do not publish confidential employee, medical, or incident data on the site. Use forms and secured document systems for sensitive information.
