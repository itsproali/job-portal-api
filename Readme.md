# Job Portal --- Server with Mongoose in MVC Architecture

## Credentials:

**Admin:**

- email: admin@gmail.com
- password: Admin123#

**Hiring Manager:**

- email: manager@gmail.com
- password: Manager123#

**Candidate:**

- email: candidate@gmail.com
- password: Candidate123#

<br>

## Features:-

- Save user password by hashing.
- Secured all the routes using JWT.
- Handle all kinds of errors.
- User can signup, login, get user information.
- HR can post, get, update jobs.
- Admin can track the job portal by some special queries.

<br>

## Routes:-

**Authentication**

```
- {POST} /user/signup ------ Create a New User Account by providing data according to User Model.
- {POST} /user/login  ------ Log in with email and password to get a token.
- {GET} /user/me      ------ Get User Information verifying the token.
```

<br>

**Hiring Manager Routes**

```
- {POST} /manager/jobs      ------ Post a new job according to Job Model.
- {GET} /manager/jobs       ------ Get All of his/her posted job.
- {GET} /manager/jobs/:id   ------ Get a specific job details with candidates details.
- {PATCH} /manager/jobs/:id ------ Update a job by id.
```

<br>

**Candidate Routes**

```
- {GET} /jobs            ------ Get all the jobs. There has some query options: page, limit, sort.
- {GET} /jobs/:id        ------ Get a specific job with Hiring Manager details.
- {POST} /jobs/:id/apply ------ Apply for a post with these validation: can't apply twice in a job, can't apply after deadline.
```

<br>

**Admin Routes**

```
- {GET} /admin/candidates       ------ Get all the candidates of the Job Portal.
- {GET} /admin/candidate/:id    ------ Get a specific candidate details with Applied Job.
- {GET} /admin/managers         ------ Get all Hiring Manager Info.
- {GET} /admin/top-paid-jobs    ------ Get Top 10 Paid Jobs in the Job Portal.
- {GET} /admin/top-applied-jobs ------ Get Top 5 Most Applied Jobs in the Job Portal.
```

<br>

## Technologies:-

- Node JS
- Express JS
- MongoDB
- Mongoose
- Json Web Token
- Bcrypt JS
- Dotenv

Thank you so much for viewing this project. If found this helpful don't forget to click on star.
