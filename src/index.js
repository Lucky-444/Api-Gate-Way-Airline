const express = require("express");
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { Auth } = require("./utils/common");

const app = express();


const limiter = rateLimit({
  windowMs : 2 * 60 * 1000,///in every 2 mins window 
  max: 3,//3 request are come

  })







app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter); 

app.use(
  '/flightsService',
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    // pathFilter: '/api/proxy-only-this-path',
    //pathRewrite: {'^/flightsService' : '/'} // you can do this also
  }),
);
app.use(
  '/bookingService',
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    // pathFilter: '/api/proxy-only-this-path',
  }),
);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJnaGtqa2JAZ21haWwuY29tIiwiaWF0IjoxNzQ2NDY4MTk4LCJleHAiOjE3NDY0NzE3OTh9.HUt42Ah36HSx9_WsC-qu--BuiWzOX2z6GLgvj41A6mQ";
//     const response = Auth.verifyToken(token);
//     console.log(response);
    
});
