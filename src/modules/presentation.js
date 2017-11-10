import _ from 'lodash';
import { UseCase } from './use-case.js';

const users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

console.log('presentation');
console.log('lodash', _.find(users, function(o) { return o.age < 40; }));
// execute('TESTE');
UseCase.execute('BLA');