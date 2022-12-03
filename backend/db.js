import knex from "knex";

const db = knex({
    client:'pg',
    connection: {
      host:'topsy.db.elephantsql.com',
      port:'5432',
      user:'scghtmju',
      password:'ITETe-U2ETf1-Vl8xmnNHMd6NKi81JUG',
      database:'scghtmju'
    }
  })
  
  // module.exports = db
  export default db