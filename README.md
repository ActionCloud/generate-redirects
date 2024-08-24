# Generate Redirects Action

A GitHub Action to generate HTML redirect files based on provided links. You can generate some direction pages in your GitHub Pages website.

Configure an Actions workflow as following:

```yaml
jobs:
  generate-redirects:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Run generate redirects
        uses: ActionCloud/generate-redirects@v1.0.0
        with:
          target: '<A PATH TO STORE GENERATED FILES>'
          # A file named "index.html" and "twitter.html" will be generated
          links: |
            {
              "index": "https://google.com",
              "twitter": "https://x.com"
            }

      - name: Git commit
        run: |
          # git commit if there's any change
          if test -n "$(git status --porcelain 2>/dev/null)"; then
              git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
              git config --local user.name "github-actions[bot]"
              git add .
              git commit -m "Add files"
              git pull
              git push origin ${GITHUB_REF##*/}
          fi
```
