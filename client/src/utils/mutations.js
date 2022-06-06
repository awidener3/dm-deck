import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      username
      email
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String!, $password: String!) {
    updateUser(email: $email, password: $password) {
      _id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation addCharacter(
    $character_name: String!
    $player_name: String!
    $level: Int!
    $race: String!
    $class: String!
    $armor_class: Int!
    $hit_points: Int!
  ) {
    addCharacter(
      character_name: $character_name
      player_name: $player_name
      level: $level
      race: $race
      class: $class
      armor_class: $armor_class
      hit_points: $hit_points
    ) {
      _id
      character_name
      player_name
      level
      race
      class
      armor_class
      hit_points
    }
  }
`;

export const ADD_BATTLE = gql`
  mutation AddBattle(
    $name: String
    $heroes: [HeroesInput]
    $monsters: [MonstersInput]
  ) {
    addBattle(name: $name, heroes: $heroes, monsters: $monsters) {
      _id
      name
      heroes {
        _id
        type
        character_name
        player_name
        level
        race
        class
        armor_class
        hit_points
      }
      monsters {
        _id
        slug
        name
        size
        type
        subtype
        group
        alignment
        armor_class
        armor_desc
        hit_points
        hit_dice
        speed {
          walk
          swim
          climb
          fly
        }
        strength
        dexterity
        constitution
        intelligence
        wisdom
        charisma
        strength_save
        dexterity_save
        constitution_save
        intelligence_save
        wisdom_save
        charisma_save
        perception
        skills {
          acrobatics
          animal_handling
          arcana
          athletics
          deception
          history
          insight
          intimidation
          investigation
          medicine
          nature
          perception
          performance
          persuasion
          religion
          sleight_of_hand
          stealth
          survival
        }
        damage_vulnerabilities
        damage_resistances
        damage_immunities
        condition_immunities
        senses
        languages
        challenge_rating
        actions {
          name
          desc
          attack_bonus
          damage_dice
          damage_bonus
        }
        reactions
        legendary_desc
        legendary_actions
        spell_list
        img_main
        document__slug
        document__title
        document__license_url
        special_abilities {
          name
          desc
        }
      }
    }
  }
`;

export const DELETE_BATTLE = gql`
  mutation deleteBattle($battleId: ID!) {
    deleteBattle(battleId: $battleId) {
      _id
      name
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation addCollection($name: String, $backgroundImg: String) {
    addCollection(name: $name, background_img: $backgroundImg) {
      _id
      name
      background_img
    }
  }
`;

export const ADD_BATTLE_TO_COLLECTION = gql`
  mutation AddBattleToCollection($battleId: ID, $collectionId: ID) {
    addBattleToCollection(battleId: $battleId, collectionId: $collectionId) {
      username
      collections {
        _id
        name
        background_img
      }
    }
  }
`;
