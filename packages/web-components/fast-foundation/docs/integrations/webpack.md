---
id: webpack
title: Webpack
sidebar_label: Webpack
custom_edit_url: https://github.com/microsoft/fast-dna/edit/master/packages/web-components/fast-foundation/docs/integrations/webpack.md
---

FAST works great with TypeScript and Webpack, using a fairly standard setup. Let's take a look at how you can set up a TypeScript+Webpack project, starting from scratch.

## Setting up the Package

First, let's make a directory for our new project. From the terminal:

```shell
mkdir fast-webpack
```

Next, let's move into that directory, where we'll set up our project:

```shell
cd fast-webpack
```

From here, we'll initialize npm:

```shell
npm init
```

Follow the prompts from npm, answering each question in turn. You can always accept the defaults at first and then make changes later in the package.json file.

Next, we'll install the FAST packages, along with supporting libraries. To do that, run this command:

```shell
npm install --save @microsoft/fast-components @microsoft/fast-element lodash-es
```

We also need to install the Webpack build tooling:

```shell
npm install --save-dev clean-webpack-plugin ts-loader typescript webpack webpack-cli webpack-dev-server
```

## Adding Configuration and Source

Now that we've got our basic package and dependencies setup, let's create some source files and get things configured. Since we're going to be writing a bit of code, now is a great time to involve a code editor in the process. If you're looking for a great editor for TypeScript and front-end in general, we highly recommend [VS Code](https://code.visualstudio.com/).

Open the `fast-webpack` folder in your favorite editor. You should see your `package.json` along with a `package-lock.json` and a `node_modules` folder.

First, let's create a `src` folder where we'll put all our TypeScript code. In the `src` folder, add a `main.ts` file. You can leave the file empty for now. We'll come back it in a bit.

Next, in the root of your project folder, add a `tsconfig.json` file to configure the TypeScript compiler. Here's an example starter config that you can put into that file:

```json
{
  "compilerOptions": {
    "pretty": true,
    "target": "ES2015",
    "module": "ES2015",
    "moduleResolution": "node",
    "importHelpers": true,
    "experimentalDecorators": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noEmitOnError": true,
    "strict": true,
    "outDir": "dist/build",
    "rootDir": "src",
    "lib": [
      "dom",
      "esnext"
    ]
  },
  "include": [
    "src"
  ]
}
```

You can learn more about `tsconfig.json` options in [the official TypeScript documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Next, create a `webpack.config.js` file in the root of your project folder with the following source:

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function(env, { mode }) {
  const production = mode === 'production';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: {
      app: ['./src/main.ts']
    },
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'node_modules']
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      writeToDisk: true,
      open: !process.env.CI,
      lazy: false
    },
    plugins: [
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.ts$/i,
          use: [
            {
              loader: 'ts-loader'
            }
          ],
          exclude: /node_modules/
        }
      ]
    }
  }
}
```

This setup uses `ts-loader` to process TypeScript. It will also enable both a production mode and a development mode that watches your source, recompiling and refreshing your browser as things change. You can read more about Webpack configuration in [the official Webpack documentation](https://webpack.js.org/).

To enable easy execution of both our production and development builds, let's add some script commands to our `package.json` file. Find the `scripts` section of your `package.json` file and add the following two scripts:

```json
"scripts": {
  "build": "webpack --mode=production",
  "dev": "webpack-dev-server"
}
```

The `build` script will build your TypeScript for production deployment while the `dev` script will run the development web server so you can write code and see the results in your browser. You can run these scripts with `npm run build` and `npm run dev` respectively.

To complete our setup, we need to add an `index.html` file to the root of our project. We'll start with some basic content as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>FAST Webpack</title>
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

There's nothing special about the HTML yet other than the `script` tag in the `body` that references the `bundle.js` file that our Webpack build will produce.

## Using the Components

With all the basic pieces in place, let's run our app in dev mode with `npm run dev`. Webpack should build your project and open your default browser with your `index.html` page. Right now, it should be blank, since we haven't added any code or interesting HTML. Let's change that.

First, open your `src/main.ts` file and add the following code:

```ts
import { 
  FASTDesignSystemProvider, 
  FASTCard, 
  FASTButton 
} from '@microsoft/fast-components';

/*
 * Ensure that tree-shaking doesn't remove these components from the bundle.
 * There are multiple ways to prevent tree shaking, of which this is one.
 */
FASTDesignSystemProvider;
FASTCard;
FASTButton;
```

This code imports the `<fast-design-system-provider>` component as well as the `<fast-card>`, and `<fast-button>` components. Once you save, the dev server will rebuild and refresh your browser. However, you still won't see anything. To get some UI showing up, we need to write some HTML that uses our components. Replace the `<body>` of your `index.html` file with the following markup:

```html
<body>
  <fast-design-system-provider use-defaults>
    <fast-card>
      <h2>Hello World!</h2>
      <fast-button appearance="accent">Click Me</fast-button>
    </fast-card>
  </fast-design-system-provider>
  <style>
    :not(:defined) {
      visibility: hidden;
    }
    
    fast-design-system-provider {
      display: inline-block;
    }

    fast-card {
      padding: 16px;
      display: flex;
      flex-direction: column;
    }

    h2 {
      font-size: var(--type-ramp-plus-5-font-size);
      line-height: var(--type-ramp-plus-5-line-height);
    }

    fast-card > fast-button{
      align-self: flex-end;
    }
  </style>
  <script src="dist/bundle.js"></script>
</body>
```

After saving your `index.html` file, refresh your browser and you should see a card with text and a button.

Congratulations! You're now setup to use FAST, TypeScript, and Webpack. You can import and use more components, build your own components, and when you are ready, build and deploy your website or app to production.