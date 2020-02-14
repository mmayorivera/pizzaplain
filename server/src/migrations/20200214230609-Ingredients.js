module.exports = {
  async up(db, client) {
    db.createCollection( "Ingredient", {
      validator: { $jsonSchema: {
          bsonType: "object",
          required: [ "name", "ico"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            ico: {
              bsonType: "string",
              description: "must be a string and is required"
            }
          }
        } },
      validationLevel: "strict"
    } );
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    db.dropCollection("Ingredient");
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
