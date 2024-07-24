import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  return (
    <>
      <Post
        id={1}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullName: "Keff",
        }}
        createdAt={"12 may 2024 г."}
        viewsCount={150}
        commentsCount={3}
        tags={["react", "fun", "typescript"]}
        isFullPost
      >
        <p>
        Hello everyone, Welcome to my personal blog! I'm excited to have you here and to share my journey,
         thoughts, and experiences with you. So, here we are, the very first post. 🎉 If you're reading this,
          it means I managed to set everything up correctly – and that's a small miracle in itself! 😄
         Thank you for joining me, and stay tuned for more posts coming soon. I promise it'll be a fun ride!
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Carrot Power",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Some comments HOHo",
          },
          {
            user: {
              fullName: "Altos Dream",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
