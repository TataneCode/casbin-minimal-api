import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

// Global flag to avoid duplicate initialization in watch mode
const GLOBAL_FLAG = '__ngTestEnvInit';
const g: any = globalThis as any;

if (!g[GLOBAL_FLAG]) {
  const testBed = getTestBed();
  testBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
    teardown: { destroyAfterEach: true }
  });
  g[GLOBAL_FLAG] = true;
}
