const request = require("supertest");
const app = require("../../../app");
const {
  productExamples,
  seedProduct,
  truncateProduct,
} = require("../../fixtures/product");

describe("POST /login", () => {
  test("should respond with a token on successful login", async () => {
    const data = {
      email: "johndoe@gmail.com",
      password: "$2b$10$S7C7oAaYVatEmCLMDP2amOuqxMTJmfSNLk3vGO6PrUnmmEVB5hLQO",
    };

    const res = await request(app).post("/api/users/login").send(data);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

describe("POST /products", () => {
  // beforeAll(async () => {
  //   await truncateProduct();
  //   await seedProduct();
  // });

  // afterAll(async () => {
  //   await truncateProduct();
  // });

  describe("post all products", () => {
    test("should respond with all products", async () => {
      const data = {
        nama_produk: "Ciki Elektrolit",
        kategori: "Makanan",
        harga: 2500,
        persediaan: 200,
        deskripsi: "Ini deskripsi dari makanan elektrolit",
      };

      const res = await request(app)
        .post("/api/products")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTk0NzVhMzcyZGMyZDFhODk4ZDhlNiIsImlhdCI6MTY4Nzc2Njg4OCwiZXhwIjoxNjg3ODUzMjg4fQ.MtxdyAQj0Mh5v5MJ8EV4PwiE2_MSgDSoxgZcn9g4jug')
        .send(data);
      console.log(res.body);
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
