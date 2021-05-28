import * as glob from 'fast-glob';
import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import styleLint from '@amatlash/vite-plugin-stylelint';

import * as tsconfig from './tsconfig.json';

const paths = tsconfig.compilerOptions.paths;

const defaultAlias = Object.keys(paths).reduce((acc, key) => {
  const value = paths[key][0];
  const path: string = key.replace('/*', '');
  acc.push({
    find: path,
    replacement: resolve(__dirname, value.replace('/*', '')),
  });
  return acc;
}, [] as any[]);

const files = glob.sync(resolve(__dirname, 'src') + '/**/*.html').reduce((acc: Record<string, string>, cur: string) => {
  let name = cur.replace(join(__dirname) + '/src/', '').replace('/index.html', '');
  // If name is blank, make up a name for it, like 'home'
  if (name === '') {
    name = 'home';
  }

  acc[name] = cur;
  return acc;
}, {});

export default defineConfig({
  root: 'src',
  clearScreen: false, // This is to show Eleventy output in the console along with Vite output
  plugins: [styleLint(), eslintPlugin()],
  build: {
    rollupOptions: {
      input: files,
    },
    outDir: '../public', // The output directory is relative to the project root, so we need to put it back one folder to work
  },
  resolve: {
    alias: [
      ...defaultAlias,
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), 'node_modules/$1'),
      },
    ],
  },
});
