# guest-book-app
Api that receives feedback from hotel guests

## Getting started locally
Install dependecies

```shell
npm i
```

And than start the API

```shell
npm start
```

App is starting on port `8080`

## Getting started with docker
Just run docker-compse and everything should be fine

```shell
docker-compose up
```

Docker app runs on port `49160`

### API

If you are using postman you can simply import postman collection, just keep in mind postman is set up for http://localhost:8080 -> [postman-collection](guest-book-app.postman_collection.json)

* [GET] - {service_url}/feedback - Returns all of the feedbacks. Basic authentication required (Username - Admin, passowrd - Admin). Also supports filtering using query strings take a look below for more info

#### Query string filtering options

| Query string key | Type     | Description                                                                  | Example                |
|------------------|----------|------------------------------------------------------------------------------|------------------------|
| authorName       | String   | Filter by author name                                                        | 'Test Testoff'         |
| fromDate         | DateTime | Get all feedbacks starting from. API expects Date Time in UTC.               | '2020-05-27T10:54:51Z' |
| toDate           | DateTime | Get all feedbacks no later than provided date. API expects Date Time in UTC. | '2020-05-28T10:54:51Z' |

* [POST] - {service_url}/submit - Submits feedback, expects `authorName` and `body` params passed in body JSON format. Take a look on input/output schema below.

#### Input schema

| Prop key   | Type   | Description            | Example         |
|------------|--------|------------------------|-----------------|
| authorname | String | Feedback's author name | 'Tom Jerry'     |
| body       | String | Feedback itself        | 'Awesome hotel' |


#### Output schema

| Prop key    | Type     | Description                                | Example                |
|-------------|----------|--------------------------------------------|------------------------|
| authorname  | String   | Feedback's author name                     | 'Tom Jerry'            |
| body        | String   | Feedback itself                            | 'Awesome hotel'        |
| dateCreated | DateTime | Date on which feedbacks has been submitted | '2020-05-28T10:54:51Z' |
