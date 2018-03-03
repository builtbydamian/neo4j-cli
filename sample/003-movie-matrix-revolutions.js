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
    
    CREATE (TheMatrixRevolutions:Movie {title:'The Matrix Revolutions', released:2003, tagline:'Everything that has a beginning has an end'}),
    
    (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrixRevolutions),
    (Carrie)-[:ACTED_IN {roles:['Trinity']}]->(TheMatrixRevolutions),
    (Laurence)-[:ACTED_IN {roles:['Morpheus']}]->(TheMatrixRevolutions),
    (Hugo)-[:ACTED_IN {roles:['Agent Smith']}]->(TheMatrixRevolutions),
    (LillyW)-[:DIRECTED]->(TheMatrixRevolutions),
    (LanaW)-[:DIRECTED]->(TheMatrixRevolutions),
    (JoelS)-[:PRODUCED]->(TheMatrixRevolutions);
  `);
};