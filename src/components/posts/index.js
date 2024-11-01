import Post from '../post';

const Posts = ({ posts }) => {
  return (
    <>
      {posts
        .slice()
        .reverse()
        .map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              name={`${post.author.firstName} ${post.author.lastName}`}
              date={post.createdAt}
              content={post.content}
              posterid={post.author.id}
            />
          );
        })}
    </>
  );
};

export default Posts;
