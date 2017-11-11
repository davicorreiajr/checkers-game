import _ from 'lodash';
import { UseCase } from './use-case.js';
import { Board } from './presentation/board.presentation';

const users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

console.log('presentation');
console.log('lodash', _.find(users, function(o) { return o.age < 40; }));
// execute('TESTE');
UseCase.execute('BLA');
Board.execute('bleus');

const Presentation = (() => {
  function test(str) {
    console.log(str + 'module');
    Board.execute('bleus');
  }

  return {
    test
  };
})()

Presentation.test('AARRRRHJJJ');

window.Presentation = Presentation;