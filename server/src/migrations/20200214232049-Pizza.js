module.exports = {
  async up(db, client) {
    db.createCollection( "Pizza", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "toppingsList"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            toppingsList: {
              bsonType: "string",
              description: "must be a string and is required"
            }
          }
        }
      },
      validationLevel: "strict"
    });
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
      db.dropCollection("Pizza");
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
