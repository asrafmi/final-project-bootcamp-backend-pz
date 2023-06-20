const productSvc = require('./product');
const Product = require('../models/product');
const productFixtures = require('../bin/example/products.js');

describe('.fetch()', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('fetch products', async () => {
    jest.spyOn(Product, 'find').mockReturnValue(productFixtures);
    const res = await productSvc.fetch();
    expect(res.length > 0).toBeTruthy();
  });
  test('fetch empty products', async () => {
    jest.spyOn(Product, 'find').mockReturnValue([]);
    const res = await productSvc.fetch();
    expect(res.length > 0).toBeFalsy();
    expect(res.message).toBe('data is empty');
  });
});
describe('.getOne()', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('fetch one product', async () => {
    jest.spyOn(Product, 'findOne').mockReturnValue(productFixtures[0]);
    const res = await productSvc.getOne();
    expect(res.name).toBe(productFixtures[0].name);
    expect(res.price).toBe(productFixtures[0].price);
    expect(res.stock).toBe(productFixtures[0].stock);
  });
});