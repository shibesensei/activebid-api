const express = require('express');
const app = express();

// Импорт middleware и роуты
const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const personalRoutes = require('./routes/personal.routes');
const productRoutes = require('./routes/product.routes');
const auctionRoutes = require('./routes/auction.routes');
const bidRoutes = require('./routes/bid.routes');


console.log('loggerMiddleware:', typeof loggerMiddleware);
console.log('errorMiddleware:', typeof errorMiddleware);
console.log('authRoutes:', typeof authRoutes);
console.log('userRoutes:', typeof userRoutes);
console.log('personalRoutes:', typeof personalRoutes);
console.log('productRoutes:', typeof productRoutes);
console.log('auctionRoutes:', typeof auctionRoutes);
console.log('bidRoutes:', typeof bidRoutes);

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/bids', bidRoutes);

// Глобальный обработчик ошибок
app.use(errorMiddleware);

module.exports = app;
