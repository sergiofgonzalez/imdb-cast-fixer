IMDb Cast Fixer
===============
> Parses and formats text pasted from the cast of IMDb

IMDb Cast Fixer is a very simple application in which you can paste text from IMDb full credits page and correctly formats it.

For example:
The following input:
```
Sam Neill	...
Dr. Alan Grant
Laura Dern	Laura Dern	...
Dr. Ellie Sattler
Jeff Goldblum	Jeff Goldblum	...
Dr. Ian Malcolm
```

will be transformed into:
```
Sam Neill...Dr. Alan Grant
Laura Dern...Dr. Ellie Sattler
Jeff Goldblum...Dr. Ian Malcolm
```

# ToDo backlog

1. Link Heroku to GitHub repo
2. Improve error reporting: no `alert`, use Bootstrap panel instead
3. Remove fix button (automatic transformation)
4. Make the icon transparent (maybe i have a transparent version somewhere).
5. Trim initial space that may be found in the input
6. Favicon not displayed on Heroku endpoint.
