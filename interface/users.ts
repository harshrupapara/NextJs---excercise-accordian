interface Users {
  id: number;
  body: string;
  postId?: number;
  user: {
    id: number;
    username: string;
  };
}

export default Users;
