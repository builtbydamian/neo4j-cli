module.exports = (db) => {
  return db.run(`
    MATCH
    (Keanu:Person {name:'Keanu Reeves'}),
    (Carrie:Person {name:'Carrie-Anne Moss'}),
    (Laurence:Person {name:'Laurence Fishburne'}),
    (Hugo:Person {name:'Hugo Weaving'}),
    (LillyW:Person {name:'Lilly Wachowski'}),
    (LanaW:Person {name:'Lana Wachowski'}),
    (JoelS:Person {name:'Joel Silver'})
    
    CREATE
    (TheMatrixReloaded:Movie {title:'The Matrix Reloaded', released:2003, tagline:'Free your mind'}),
    
    (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrixReloaded),
    (Carrie)-[:ACTED_IN {roles:['Trinity']}]->(TheMatrixReloaded),
    (Laurence)-[:ACTED_IN {roles:['Morpheus']}]->(TheMatrixReloaded),
    (Hugo)-[:ACTED_IN {roles:['Agent Smith']}]->(TheMatrixReloaded),
    (LillyW)-[:DIRECTED]->(TheMatrixReloaded),
    (LanaW)-[:DIRECTED]->(TheMatrixReloaded),
    (JoelS)-[:PRODUCED]->(TheMatrixReloaded);
  `);
};