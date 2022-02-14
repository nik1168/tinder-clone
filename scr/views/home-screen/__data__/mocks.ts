import {MatchUser, User} from '../typings';

export const mockedUserNik: MatchUser = {
  id: '6961153',
  firstName: 'Niklaus',
  lastName: 'Geisser',
  occupation: 'Software Engineer',
  age: 27,
  photoUrl:
    'https://todaysveterinarypractice.com/wp-content/uploads/sites/4/2019/02/French-bulldog-study-birth-risk.jpg',
};

export const mockedUserJohann: MatchUser = {
  id: '6961154',
  firstName: 'Johann',
  lastName: 'Geisser',
  occupation: 'Telecomunications Engineer',
  age: 27,
  photoUrl:
    'https://static.wixstatic.com/media/6e7f85_8a1f7d708637402e94be3db48565b697~mv2.jpg/v1/fill/w_1125,h_1110,al_c/6e7f85_8a1f7d708637402e94be3db48565b697~mv2.jpg',
};

export const mockedUserNicole: User = {
  id: '6961154',
  displayName: 'Nicole Geisser',
  job: 'Telecomunications Engineer',
  age: 27,
  photoURL:
    'https://static.wixstatic.com/media/6e7f85_8a1f7d708637402e94be3db48565b697~mv2.jpg/v1/fill/w_1125,h_1110,al_c/6e7f85_8a1f7d708637402e94be3db48565b697~mv2.jpg',
};

export const mockedMatchUsers: MatchUser[] = [mockedUserNik, mockedUserJohann];
