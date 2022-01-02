import {MatchUser} from '../typings';

export const mockedUserNik: MatchUser = {
  id: 6961153,
  firstName: 'Niklaus',
  lastName: 'Geisser',
  occupation: 'Software Engineer',
  age: 27,
  photoUrl:
    'https://scontent.flpb2-1.fna.fbcdn.net/v/t39.30808-6/265575561_10227398448612160_5617705078451640575_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=VIgfXN0vsGcAX_3c6AW&_nc_ht=scontent.flpb2-1.fna&oh=00_AT8NYVs2WFdOOpmpu_jId57ajz0GnMjNkaTpwIJgxJ4CnA&oe=61D57E3A',
};

export const mockedUserJohann: MatchUser = {
  id: 6961154,
  firstName: 'Johann',
  lastName: 'Geisser',
  occupation: 'Telecomunications Engineer',
  age: 27,
  photoUrl:
    'https://scontent.flpb2-1.fna.fbcdn.net/v/t1.18169-9/16266308_1258047787565440_4986682848822152324_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=hVIpkDhM73oAX_DjS2W&_nc_ht=scontent.flpb2-1.fna&oh=00_AT-OJ16AoAsoyUeIW3Tb61OLZrGHcD0f6n7_6pasnPJj-A&oe=61F7B5CD',
};

export const mockedMatchUsers: MatchUser[] = [mockedUserNik, mockedUserJohann];
