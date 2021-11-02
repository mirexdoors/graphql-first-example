import express from 'express';
import pkg from 'graphql';
const {graphql, buildSchema} = pkg;

import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';

import Champion from './champion.js';

const champions = [
    new Champion('Ashe', 100),
    new Champion('Vayne', 200)
]

const schema = buildSchema(`
  type Query {
    language: String
    getChampions: [Champion]
    getChampionByName(name: String!): Champion
  }
  type Champion {
     name: String
     attackDamage: Float
  }
  type Mutation {
    updateAttackDamage(name: String!, attackDamage: Float): Champion
  } 
`)


//reslover - точка входа для ответа на все запросы
const rootValue = {
    language: () => 'GraphQL',
    getChampions: () => champions,
    getChampionByName: ({ name }) => {
        return champions.find(x => x.name === name)
    },
    updateAttackDamage: ({ name, attackDamage = 150 }) => {
        const champion = champions.find(x => x.name === name);
        champion.attackDamage = attackDamage;
        return champion;
    }
}

//create express app
const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    rootValue, schema, graphql: true
}));

app.listen(4000, () => console.log('Server listening on 4000'));
