import * as studio from '../index';

describe('studio exports', () => {
  it('should match snapshot', () => {
    expect(Object.keys(studio)).toMatchInlineSnapshot(`
      [
        "findChildOverrides",
        "getOverridesFromVariants",
        "getOverrideProps",
        "mergeVariantsAndOverrides",
      ]
    `);
  });
});
