// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Speedtest Api",
    description: "Run speedtests and log them in a database",
  },
  host: "localhost:3000",
  schemes: ["http"],
  components: {
    securitySchemes: {
      basicAuth: {
        type: "http",
        scheme: "basic",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/server.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
