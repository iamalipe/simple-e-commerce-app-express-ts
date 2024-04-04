import express, { Express } from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { corsOptions, defaultRateLimiter, envVariable } from "./config";
import { mainRouter } from "./routers";

const app: Express = express();

app.use(express.json());
app.use(cors(corsOptions));

// morgan is a logging middleware for Express.js that logs HTTP requests to your application. When you call app.use(morgan("dev")), you're configuring Morgan to log requests using the "dev" pre-defined format.
// The "dev" format in Morgan is a concise output format that includes the HTTP method, response status code, URL, response time, and size of the response body. This format is useful for development purposes as it provides essential information about each request in a readable format.
app.use(morgan("common"));

// helmet is a middleware function for Express.js that helps secure your web applications by setting various HTTP headers. These headers can mitigate certain common security vulnerabilities, such as cross-site scripting (XSS), clickjacking, and other attacks.
// When you call app.use(helmet()), you're telling your Express application to use Helmet middleware for every HTTP request it receives. Helmet automatically adds various HTTP headers to the responses sent by your application, thereby enhancing its security posture.
app.use(helmet());

// compression is another middleware for Express.js that compresses HTTP responses sent by your application before sending them to the client. It's used to reduce the size of responses, which can improve the performance of your web application by reducing bandwidth usage and decreasing load times for clients.
// When you call app.use(compression()), you're instructing Express to use the compression middleware for every HTTP response it sends. Compression works by compressing the response bodies using gzip or deflate compression algorithms, depending on the client's capabilities and preferences.
app.use(compression());

// By default, Express sets the X-Powered-By header to identify itself. However, revealing this information might expose your application to potential attackers, as it discloses the technology stack being used. Disabling the X-Powered-By header helps obscure this information, making it harder for attackers to target specific vulnerabilities associated with Express or other technologies your application might be using.
app.disable("x-powered-by");

// The ETag (entity tag) header is used for caching purposes, allowing clients to validate whether their cached version of a resource is still valid. However, in some cases, it can be a source of security vulnerabilities, such as cache poisoning attacks. Disabling ETags can help mitigate these risks, although it may impact caching performance.
app.disable("etag");

// app.enable("trust proxy") is an instruction in Express.js to trust the proxy server's information regarding the client's IP address. When your Express application is deployed behind a proxy server, such as Nginx or Apache, the actual client's IP address might be hidden, and the proxy server's IP address is forwarded instead.
// Enabling trust for the proxy is crucial for obtaining the correct client IP address, especially if your application performs tasks based on IP addresses, such as rate limiting, geolocation, or logging.
// app.enable("trust proxy");

// Rate limiting is essential for maintaining the security, stability, and performance of web applications and APIs, especially in environments where resources are limited or costly.
app.use(defaultRateLimiter);

app.use(envVariable.PREFIX, mainRouter);

app.listen(envVariable.PORT, () => {
  console.log(`🟢 Server is running on port ${envVariable.PORT}.`);
});
