# GraphQL Queries & Mutations

- [GraphQL Queries & Mutations](#graphql-queries--mutations)
  - [Queries](#queries)
    - [Get all battles](#get-all-battles)
    - [Get a battle by its id](#get-a-battle-by-its-id)

## Queries

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
query battle ($battleId: ID) {
  battle(battleId: $battleId) {
    name
    userId: {
      username
      email
    }
  }
}
```