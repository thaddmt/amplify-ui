/* eslint-disable no-console */
import * as tf from '@tensorflow/tfjs-core';
import * as blazeface from '@tensorflow-models/blazeface';

// TODO:: Figure out if we should lazy load these or not.
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

export const modelLog = (): void => {
  console.log('tf', tf);
  console.log('blazeface', blazeface);
  console.log('tfjsWasm', tfjsWasm);
};
