# CropShop UI

A client-side application built on React and Redux combining image uploading & transformations from filestack via the [Filestack JavaScript SDK](https://github.com/filestack/filestack-js); product information, and shopping cart editing with Shopify's [Storefront API](https://help.shopify.com/en/api/storefront-api) and the [JavaScript Buy SDK](https://help.shopify.com/en/api/storefront-api/tools/js-buy-sdk); as well as a *decent* amount of original code to provide a streamlined and easy user experience for uploading and editing images to be printed on custom materials.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Gotchyas

This is up there because why scroll to the bottom to find out what might have tripped you up?

### Update the API URL in `globals.js`

As the application that is meant to consume the production build of app running on a server, to use the tunneled dev server that hosts the API and Shopify app, the dev value of `appApiUrl` must be updated with the current ngrok url that is active.

```js
let appApiUrl;
if (process.env.NODE_ENV === 'production') {
  appApiUrl = 'example.com';
} else {
  // Update this guy here!!!
  appApiUrl = 'https://834bc032.ngrok.io';
}
```

## Installation

*TODO* Fill this in

## Available Scripts

### `npm start`

Runs the app in the development mode.<br>
The current port is set to 8000 so as not to conflict with running a development server for the API that runs on 3000.
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment

### Running the proper build script

*TODO* Fill this in

#### React Scripts and Gulp

*TODO* Fill this in

#### Publishing to NPM

*TODO* Fill this in

## Learn More about Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
