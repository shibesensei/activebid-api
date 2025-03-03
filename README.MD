ActiveBid API

ActiveBid API is a RESTful API for online auctions, developed using Node.js, Express, PostgreSQL, ClickHouse and RabbitMQ. The API supports user registration, auction creation, bidding and product management.

🚀 Installation and launch

1. Cloning the repository

git clone https://github.com/shibesensei/activebid-api activebid-api
cd activebid-api

2. Installing dependencies

npm install

3. Setting up the environment

Create a .env file in the root folder and set up environment variables:

PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/auction_db
CLICKHOUSE_URL=http://localhost:8123
RABBITMQ_URL=amqp://localhost
JWT_SECRET=your_secret_key

4. Starting the server

npm start

The server will be launched on http://localhost:3000.

📦 Using Docker

Running via Docker Compose

docker-compose -f docker/docker-compose.yml up --build -d

🛠 API Endpoints

1. Authentication

POST /api/auth/register - Register a user

POST /api/auth/login - Log in and get a JWT token

2. Users

GET /api/users - Get a list of users (requires JWT)

GET /api/users/****:id - Get user information

3. Auctions

POST /api/auctions - Create an auction

GET /api/auctions - Get a list of active auctions

4. Bids

POST /api/bids - Place a bid on an auction

🐳 Deploy to a server

Connect to the server:

ssh user@your_server_ip

Install Docker and Docker Compose.

Run API:

docker-compose up --build -d

🤝 License

The project is distributed under the MIT license. For more information, see LICENSE.md.
