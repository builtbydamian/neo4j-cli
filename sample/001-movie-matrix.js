module.exports = (db) => {
  return db.run(`
    CREATE
    (TheMatrix:Movie {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'}),
    
    (Keanu:Person {name:'Keanu Reeves', born:1964}),
    (Carrie:Person {name:'Carrie-Anne Moss', born:1967}),
    (Laurence:Person {name:'Laurence Fishburne', born:1961}),
    (Hugo:Person {name:'Hugo Weaving', born:1960}),
    (LillyW:Person {name:'Lilly Wachowski', born:1967}),
    (LanaW:Person {name:'Lana Wachowski', born:1965}),
    (JoelS:Person {name:'Joel Silver', born:1952}),
    (Emil:Person {name:"Emil Eifrem", born:1978}),
    
    (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrix),
    (Carrie)-[:ACTED_IN {roles:['Trinity']}]->(TheMatrix),
    (Laurence)-[:ACTED_IN {roles:['Morpheus']}]->(TheMatrix),
    (Hugo)-[:ACTED_IN {roles:['Agent Smith']}]->(TheMatrix),
    (Emil)-[:ACTED_IN {roles:["Emil"]}]->(TheMatrix),
    (LillyW)-[:DIRECTED]->(TheMatrix),
    (LanaW)-[:DIRECTED]->(TheMatrix),
    (JoelS)-[:PRODUCED]->(TheMatrix);
  `);
};