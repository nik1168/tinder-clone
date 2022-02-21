import {User} from '../../../views/home-screen/typings';

export interface UserMatch {
  id: string;
  users: Record<string, User>;
}

export interface ChatListProps {
  usersMatched: UserMatch[] | null;
}
