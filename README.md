# ReviewAPI

![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Amazon AWS](https://img.shields.io/badge/Amazon_AWS-{232F3E}?style=for-the-badge&logo=amazonaws&logoColor=white)
![NGINX](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

##  Project Overview
  - Take existing back-end infrastructure and convert to a microservice architecture.
  - Handle 1k> request per second for all crud operations.

## Setup
  - 4 servers running on AWS Micro Ec2 instances.
  - 1 instance running NGINX with least connection load balancing, cacheing enabled.
  - 1 instance hosting PostgreSQL database.

## Testing Used
   - K6 for local testing of queries.
   - New Relic + Loader.io to test infrastructure under load.

## Results
![8k](docs/8kresult.png)