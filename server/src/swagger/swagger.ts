import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

export const swaggerDoc: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Speedtest Api",
      version: "1.0.0",
      description: "Run speedtests and log them in a database",
    },
    host: "localhost:3001",
    schemes: ["http"],
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
  },
  apis: ["./src/server.ts", "./src/routes/*.ts"],
};

export const swaggerSpecification = swaggerJsdoc(swaggerDoc);

export const swaggerUiOptions: SwaggerUiOptions = {};
