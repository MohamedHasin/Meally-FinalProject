# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.


## How to Run

- Clone this repository
- Install dependencies using `npm install`
- Start development server with `npx nuxi dev`

### Running on a mobile device

> Xcode (for iOS) and Android Studio/Android SDK (Android) are required to open or run the project. See [Capacitor Environment Setup docs for more details](https://capacitorjs.com/docs/getting-started/environment-setup). If this is your first time running a mobile app with Android Studio, additional configuration may be required to use `npx cap run android`.

- Create web build with `npx nuxi generate`
- Sync to Capacitor with `npx cap sync`
- Run the app with `npx cap run ios` or `npx cap run android` OR
- Open in XCode with `npx cap open ios` or Android Studio with `npx cap open android`
- Run app using built-in emulators in XCode or Android Studio