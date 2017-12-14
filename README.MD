# Festify Test Repo

`Getting started` `Installation` `Tutorial`

## Getting started

### Prerequisites

Install the following tools to work on the project:

* [node.js](https://nodejs.org/en/) - `Version 9.8.1` is recommended
* [bower](https://bower.io): `npm i -g bower`
* [gulp](https://gulpjs.com): `npm i -g gulp`
* [xCode](https://developer.apple.com/xcode/): (for iOS Builds - MacOS only)
* [Android Studio](https://developer.android.com/studio/install.html): (for
  Anrdoid Builds)
* [Firebase Tools](https://github.com/firebase/firebase-tools): `npm i -g firebase-tools`
* [git](https://git-scm.com/downloads)
* [ionic](https://ionicframework.com): `npm i -g ionic`
* [cordova](https://cordova.apache.org/#getstarted): `npm i -g cordova`

> We recommend you to use [Visual Studio Code](https://code.visualstudio.com) as
> Code Editor and
> [Google Chrome](https://www.google.de/chrome/browser/desktop/index.html?brand=CHBD&gclid=Cj0KCQiA6enQBRDUARIsAGs1YQgSG4irEkY5yKQGjqnhG4trSkeNG-MqV5tAbNmjH4n5LEULoazfYBEaAvuIEALw_wcB&gclsrc=aw.ds&dclid=COOklfCM3dcCFQOFGQodhCwBQQ)
> as Web-Browser for debugging.
>
> Helpful Visual Studio Code Plugins:
>
> * Prettier - Code formatter (auto indent and syntax structure)

### Error Handling

#### MacOS

* install angular `npm i -g angular`

#### Windows

* install C++ Compiler `npm i -g windows-build-tools`
* install stable Android Studio Version
* check all PATH variables (Android SDK, Python, ...)

---

## Debug and Build

### Live-Testing inside the Web-Browser

> You can start a local webserver using the ionic cli to run and test the
> application on your machine. Therefore you have to do the following:

* `cd './path to your local copy'`
* run `ionic serve --lab` (use the `--browser` flag to choose your preferred
  browser: e.g: `ionic serve --lab --browser "google chrome"`)

### Generate Icons and Splashscreen

> These are Cordova resources. You can replace icon.png and splash.png inside
> `resources` and run `ionic cordova resources` to generate custom icons and
> splash screens for your app. See `ionic cordova resources --help` for details.

---

## Project Structure

## Spotify Integration

* [Web-Api](https://developer.spotify.com/web-api/)

--

## iOS Build Information

When building the app for iOS, there is a bug with the statusbar text-color. If the statusbar text-color is dark, you have to do the following:

1. Open the Xcode Project
2. Goto 'festify-info.plist'
3. Change 'Status bar style' to `Transparent Black Style``
4. Change 'View controller-based status bar appearance' to `NO`(if this field is not present, you can add it by clicking +)
