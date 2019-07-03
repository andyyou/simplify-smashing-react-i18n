# Simplify and Upgrade version for SmashingMagazine i18n

Definitely this is a boilerplate template for the [Internationalizing React Apps article](https://www.smashingmagazine.com/2017/01/internationalizing-react-apps/)

And base on this [post](https://www.smashingmagazine.com/2017/01/internationalizing-react-apps/), to focus more on [react-intl](https://github.com/formatjs/react-intl), this project attempt to simplify configuration and upgrade `@babel` version with.

Reference and origin [repository](https://github.com/yury-dymov/smashing-react-i18n).

## Warning

Do NOT use this as production, this is a demo for study `react-intl`.

## Usage

```bash
# Start dev
$ npm start
# (Optional) if you want to follow article step by step.
$ git reset d0d971d --hard


# Other commands
## Start webpack-dev-server for client resources
$ npm run webpack-dev-server

## Start express server for mimic SSR and get assets from webpack-dev-server
$ npm run express

## Visit http://localhost:3001 and webpack-dev-server specific port to 8050 that same with origin.
```

## Summary tutorial steps

1. Implement user's locale detection with `accept-language` library
2. Translate messages with `react-intl`
3. Support locale-specific content like numbers and dates

## References

* [Internationalizing React Apps article](https://www.smashingmagazine.com/2017/01/internationalizing-react-apps/)
* [Original Repository](https://github.com/yury-dymov/smashing-react-i18n)
