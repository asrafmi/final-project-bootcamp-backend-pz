const request = require("supertest");
const app = require("../../../app");
const {
  productExamples,
  seedProduct,
  truncateProduct,
} = require("../../fixtures/product");

describe("GET /products", () => {
  describe("data is empty", () => {
    beforeAll(async () => {
      await truncateProduct();
    });

    describe("table is empty", () => {
      test("should respond with empty data", async () => {
        const res = await request(app).get("/api/products");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          limit: 10,
          page: 1,
          totalItems: 0,
          totalPages: 0,
        });
      });
    });
  });

  describe("data is not empty", () => {
    beforeAll(async () => {
      await truncateProduct();
      await seedProduct();
    });

    afterAll(async () => {
      await truncateProduct();
    });

    describe("get all products", () => {
      test("should respond with all products", async () => {
        const res = await request(app).get("/api/products");
        expect(res.status).toBe(200);
      });
    });
  });
});

describe("GET /products/:id", () => {
  describe("data is empty", () => {
    beforeAll(async () => {
      await truncateProduct();
    });

    describe("product not found", () => {
      test("should respond with 404 status error", async () => {
        const res = await request(app).get("/api/products/123456");
        expect(res.status).toBe(404);
      });
    });
    describe("product not found", () => {
      test('should respond with "Produk tidak ditemukan!"', async () => {
        const res = await request(app).get("/api/products/123456");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Produk tidak ditemukan!");
      });
    });
  });

  describe("data is not empty", () => {
    beforeAll(async () => {
      await truncateProduct();
      await seedProduct();
    });

    afterAll(async () => {
      await truncateProduct();
    });

    describe("get a specific product", () => {
      test("should respond with the specified product", async () => {
        const id = productExamples[0]._id
        const res = await request(app).get(
          `/api/products/${id}`
        );
        expect(res.status).toBe(200);
        expect(res.body.nama_produk).toBe(productExamples[0].nama_produk);
        expect(res.body.harga).toBe(productExamples[0].harga);
        expect(res.body.persediaan).toBe(productExamples[0].persediaan);
        expect(res.body.deskripsi).toBe(productExamples[0].deskripsi);
        expect(res.body.kategori).toBe(productExamples[0].kategori);
        expect(res.body.terjual).toBe(productExamples[0].terjual);
        expect(res.body.rating).toBe(productExamples[0].rating);
      });
    });
  });
});
