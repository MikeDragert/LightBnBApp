const { Pool } = require('pg');

const cohort = process.argv[2];
if (cohort === undefined) {
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
  SELECT teachers.name as name, cohorts.name as cohort_name
  FROM teachers
  JOIN assistance_requests
  ON assistance_requests.teacher_id = teachers.id
  JOIN students
  ON students.id = assistance_requests.student_id
  JOIN cohorts 
  ON cohorts.id = students.cohort_id
  WHERE cohorts.name like '${cohort}%'
  GROUP BY teachers.name, cohorts.name
  ORDER BY teachers.name
`
).then (res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort_name}: ${teacher.name}`)
  })
}).catch(err => console.error('query error', err.stack))
.finally(()=> {
  pool.end();
}); 

