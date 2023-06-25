const productSvc = require('./product');
const Product = require('../models/product');
const productFixtures = require('../bin/example/products.json');

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
    expect(res.message).toBe('Data kosong');
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
    expect(res.category_id).toBe(productFixtures[0].category_id);
    expect(res.price).toBe(productFixtures[0].price);
    expect(res.stock).toBe(productFixtures[0].stock);
    expect(res.description).toBe(productFixtures[0].description);
    expect(res.rating).toBe(productFixtures[0].rating);
  });
});

describe('.update()', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('update one product', async () => {
    jest.spyOn(Product, 'insertMany').mockReturnValue(productFixtures[0]);
    const createProduct = await productSvc.create();
    expect(createProduct.name).toBe(productFixtures[0].name);
    expect(createProduct.category_id).toBe(productFixtures[0].category_id);
    expect(createProduct.price).toBe(productFixtures[0].price);
    expect(createProduct.stock).toBe(productFixtures[0].stock);
    expect(createProduct.description).toBe(productFixtures[0].description);
    expect(createProduct.rating).toBe(productFixtures[0].rating);

    jest.spyOn(Product, 'findOneAndUpdate').mockReturnValue(productFixtures[1], productFixtures[0].id);
    const updatedProduct = await productSvc.update();
    expect(updatedProduct.name).toBe(productFixtures[1].name);
    expect(updatedProduct.category_id).toBe(productFixtures[1].category_id);
    expect(updatedProduct.price).toBe(productFixtures[1].price);
    expect(updatedProduct.stock).toBe(productFixtures[1].stock);
    expect(updatedProduct.description).toBe(productFixtures[1].description);
    expect(updatedProduct.rating).toBe(productFixtures[1].rating);
  });
});

describe('.detroy()', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('delete one product', async () => {
    jest.spyOn(Product, 'findOneAndDelete').mockReturnValue(productFixtures[2]);
    const deleteProduct = await productSvc.destroy(productFixtures[2].id);
    expect(deleteProduct).toBeTruthy()
  });
});