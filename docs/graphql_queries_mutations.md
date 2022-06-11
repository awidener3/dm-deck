# DM Deck: GraphQL Queries & Mutations

- [DM Deck: GraphQL Queries & Mutations](#dm-deck-graphql-queries--mutations)
  - [Collections](#collections)
    - [Get all collections](#get-all-collections)
    - [Get collection by ID](#get-collection-by-id)
    - [Add a collection](#add-a-collection)
    - [Add a battle to a collection](#add-a-battle-to-a-collection)
    - [Remove a battle from a collection](#remove-a-battle-from-a-collection)
    - [Update a collection](#update-a-collection)
    - [Delete a collection](#delete-a-collection)
  - [Battles](#battles)
    - [Get all battles](#get-all-battles)
    - [Get a battle by its id](#get-a-battle-by-its-id)
    - [Get all battles by a user's id](#get-all-battles-by-a-users-id)
    - [Add a battle](#add-a-battle)
    - [Update a battle](#update-a-battle)
    - [Delete a battle](#delete-a-battle)
  - [Characters](#characters)
    - [Get all Characters](#get-all-characters)
    - [Get a character by id](#get-a-character-by-id)

## Collections

### Get all collections

```graphql
query collections {
  collections {
    _id
    name
    background_img
    userId {
      _id
      username
    }
    battles {
      _id
      name
    }
  }
}
```

### Get collection by ID

```graphql
query collection($collectionId: ID!) {
  collection(collectionId: $collectionId) {
    name
    background_img
    userId {
      _id
      username
    }
    battles {
      _id
      name
    }
  }
}
```

### Add a collection

```graphql
mutation addCollection($name: String!, $backgroundImg: String, $userId: ID!) {
  addCollection(name: $name, background_img: $backgroundImg, userId: $userId) {
    _id
    name
    background_img
    userId {
      _id
    }
    battles {
      _id
      name
    }
  }
}
```

### Add a battle to a collection

```graphql
mutation addBattleToCollection($battleId: ID!, $collectionId: ID!) {
  addBattleToCollection(battleId: $battleId, collectionId: $collectionId) {
    _id
    name
    battles {
      _id
    }
  }
}
```

### Remove a battle from a collection

```graphql
mutation removeBattleFromCollection($battleId: ID!, $collectionId: ID!) {
  removeBattleFromCollection(battleId: $battleId, collectionId: $collectionId) {
    _id
    name
    battles {
      _id
    }
  }
}
```

### Update a collection

```graphql
mutation updateCollection($collectionId: ID!, $name: String, $backgroundImg: String) {
  updateCollection(collectionId: $collectionId, name: $name, background_img: $backgroundImg) {
    _id
    name
    background_img
  }
}
```

### Delete a collection

```graphql
mutation deleteCollection($collectionId: ID!) {
  deleteCollection(collectionId: $collectionId) {
    _id
    name
  }
}
```

## Battles

### Get all battles

```graphql
query battles {
  battles {
    _id
    name
    userId: {
      username
      email
    }
  }
}
```

### Get a battle by its id

```graphql
query battle ($battleId: ID!) {
  battle(battleId: $battleId) {
    name
    userId: {
      username
      email
    }
  }
}
```

### Get all battles by a user's id

```graphql
query UserBattles($userId: ID!) {
  userBattles(userId: $userId) {
    userId {
      username
    }
    _id
    name
  }
}
```

### Add a battle

```graphql
mutation addBattle($userId: ID!, $name: String!, $heroes: [ID], $monsters: [ID]) {
  addBattle(userId: $userId, name: $name, heroes: $heroes, monsters: $monsters) {
    name
    userId {
      _id
    }
    heroes {
      _id
      name
    }
    monsters {
      _id
      name
    }
  }
}
```

Example query:
```json
{
  "userId": "6288084eda473f41b688ecc2", // required
  "name": "Battle with Heroes", // required
  "heroes": [
    "62a4bda3f0c46b8212531d63", 
    "62a4c2239cd70e3533e889b7", 
    "62a4c22c9cd70e3533e889b9"
  ],
  "monsters": [
    "62a4bda3f0c46b8212531d63", 
    "62a4c2239cd70e3533e889b7"
  ],
}
```

### Update a battle

Currently updates the name of a battle

```graphql
mutation updateBattle($battleId: ID!, $name: String) {
  updateBattle(battleId: $battleId, name: $name) {
    _id
    name
  }
}
```

### Delete a battle

```graphql
mutation deleteBattle($battleId: ID!) {
  deleteBattle(battleId: $battleId) {
    _id
    name
  }
}
```

## Characters

### Get all Characters

```graphql
query Characters {
  characters {
    _id
    type
    userId {
      _id
      username
    }
    character_name
  }
}
```

### Get a character by id

```graphql


```