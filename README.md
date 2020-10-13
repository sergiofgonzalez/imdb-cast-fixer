# IMDb Cast Fixer [![Build Status](https://travis-ci.org/sergiofgonzalez/imdb-cast-fixer.svg?branch=master)](https://travis-ci.org/sergiofgonzalez/imdb-cast-fixer)

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

## Deploying and SCM

The repo is deployed both to GitHub and Heroku repos through differentiated *git remotes* (`origin` and `heroku`).

### Deploying to Heroku

Run:

```bash
$ git push heroku master
```
