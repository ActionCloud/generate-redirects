const fs = require('fs');
const path = require('path');

// Get input parameters
const targetDir = process.env.GITHUB_WORKSPACE + '/' + (process.env.INPUT_TARGET || './output');
const links = JSON.parse(process.env.INPUT_LINKS || '{}');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Template string for the HTML file
const template = (url) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=${url}">
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to <a href="${url}">${url}</a></p>
</body>
</html>
`;

// Generate HTML files
Object.keys(links).forEach((key) => {
    const url = links[key];
    const htmlContent = template(url);
    const filePath = path.join(targetDir, `${key}.html`);

    // Write the HTML file
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Generated ${filePath} redirecting to ${url}`);
});
