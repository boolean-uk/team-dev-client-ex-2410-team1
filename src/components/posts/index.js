import Post from '../post';

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <>
      {posts
        .slice()
        .reverse()
        .map((post) => {
          return (
            <Post
              key={post.id}
              name={`${post.author.firstName} ${post.author.lastName}`}
              date={post.createdAt}
              content={post.content}
              comments={post.comments}
            />
          );
        })}
    </>
  );
};

export default Posts;
