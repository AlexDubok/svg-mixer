const { normalizeViewBox } = require('svg-mixer/lib/transformations');

const t = utils.testPlugin(normalizeViewBox);

it('should do nothing if viewBox presented', async () => {
  expect(await t(undefined, '<svg viewBox="0 0 0 0"></svg>'))
    .toMatchSnapshot();
});

it('should create viewBox if not presented', async () => {
  expect(await t(undefined, '<svg width="0" height="0"></svg>'))
    .toMatchSnapshot();
});