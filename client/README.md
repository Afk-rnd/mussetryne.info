# TL;DR

In this directory run this command to install gh-pages globally for deployment
'''bash
pnpm i -g gh-pages
'''


Build the svelte app to make it static
'''bash
pnpm build
'''

Run this command to push to github in the branch gh-pages
'''bash
pnpm gh-pages -d build -t true
'''

If pages is set up on the repo things should work!
