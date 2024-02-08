const { Pool } = require('pg');

const cohort = process.argv[2];
const limit = Number(process.argv[3]);
if ((cohort === undefined) || (limit === undefined)){
  console.log("Please enter a cohort name and query limit");
  return;
}


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


pool.query(`
  SELECT students.id, students.name, cohorts.name as cohort_name
  FROM students
  JOIN cohorts
  ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE '${cohort}%'
  LIMIT ${limit};`
).then (res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`)
  })
}).catch(err => console.error('query error', err.stack))
.finally(()=> {
  pool.end();
}); 

