const productSvc = require('./product');
const Product = require('../models/product');
const productFixtures = require('../bin/example/products.json');

// Mock the Product model
jest.mock('../models/product');

describe('Product Service', () => {
  describe('fetch', () => {
    it('should return paginated products', async () => {
      const mockProducts = productFixtures;
      const limit = 5;
      const totalItems = productFixtures.length;
      const totalPages = Math.ceil(totalItems / limit);

      Product.countDocuments.mockResolvedValue(totalItems);
      Product.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts),
      });

      const data = await productSvc.fetch(1, limit);
      expect(data).toEqual({ data: mockProducts, totalPages, totalItems });
      expect(Product.countDocuments).toHaveBeenCalled();
      expect(Product.find().skip).toHaveBeenCalledWith(0);
      expect(Product.find().limit).toHaveBeenCalledWith(limit);
    });

    it('should return empty data if no products found', async () => {
      const limit = 5;
      const totalItems = 0;
      const totalPages = Math.ceil(totalItems / limit);

      Product.countDocuments.mockResolvedValue(totalItems);
      Product.find.mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      });
      const data = await productSvc.fetch(1, limit);
      expect(data).toEqual({ message: 'Produk kosong', totalPages, totalItems });
      expect(Product.countDocuments).toHaveBeenCalled();
      expect(Product.find().skip).toHaveBeenCalledWith(0);
      expect(Product.find().limit).toHaveBeenCalledWith(limit);
    });
  });

  describe('getOne', () => {
    it('should return a product by ID', async () => {
      jest.spyOn(Product, 'findById').mockReturnValue(productFixtures[0]);
      const res = await productSvc.getOne();
      expect(res.nama_produk).toBe(productFixtures[0].nama_produk);
      expect(res.kategori).toBe(productFixtures[0].kategori);
      expect(res.harga).toBe(productFixtures[0].harga);
      expect(res.persediaan).toBe(productFixtures[0].persediaan);
      expect(res.deskripsi).toBe(productFixtures[0].deskripsi);
      expect(res.terjual).toBe(productFixtures[0].terjual);
      expect(res.rating).toBe(productFixtures[0].rating);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const mockProduct = productFixtures;
      Product.create.mockResolvedValue(mockProduct[0]);

      const res = await productSvc.create();
      expect(res.nama_produk).toBe(mockProduct[0].nama_produk);
      expect(res.kategori).toBe(mockProduct[0].kategori);
      expect(res.harga).toBe(mockProduct[0].harga);
      expect(res.persediaan).toBe(mockProduct[0].persediaan);
      expect(res.deskripsi).toBe(mockProduct[0].deskripsi);
      expect(res.terjual).toBe(mockProduct[0].terjual);
      expect(res.rating).toBe(mockProduct[0].rating);
    });
  });

  describe('update', () => {
    it('should update a product by ID', async () => {
      const mockProduct = productFixtures;
      Product.findByIdAndUpdate.mockResolvedValue(mockProduct[1]);

      const res = await productSvc.update(mockProduct[0], mockProduct[0].id);
      expect(res.nama_produk).toBe(mockProduct[1].nama_produk);
      expect(res.kategori).toBe(mockProduct[1].kategori);
      expect(res.harga).toBe(mockProduct[1].harga);
      expect(res.persediaan).toBe(mockProduct[1].persediaan);
      expect(res.deskripsi).toBe(mockProduct[1].deskripsi);
      expect(res.terjual).toBe(mockProduct[1].terjual);
      expect(res.rating).toBe(mockProduct[1].rating);
    });

    it('should throw an error if product is not found', async () => {
      const mockProduct = productFixtures;
      Product.findByIdAndUpdate.mockResolvedValue(null);

      await expect(productSvc.update(mockProduct[0], mockProduct[0].id)).rejects.toThrow('Produk tidak ditemukan');
    });
  });

  describe('destroy', () => {
    it('should delete a product by ID', async () => {
      const mockProduct = productFixtures;
      Product.findByIdAndDelete.mockResolvedValue(mockProduct[0]);

      const data = await productSvc.destroy(1);
      expect(data).toBe(mockProduct[0]);
    });

    it('should throw an error if product is not found', async () => {
      const mockProduct = productFixtures;
      Product.findByIdAndDelete.mockResolvedValue(null);

      await expect(productSvc.destroy(mockProduct[0])).rejects.toThrow('Produk tidak ditemukan');
    });
  });
});
