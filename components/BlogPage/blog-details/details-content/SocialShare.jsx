"use client";
import {
  FacebookShareButton,
  TwitterShareButton,
} from "next-share";

const SocialShare = (props) => {
  const {title, slug} = props;
  return (
    <>
      <FacebookShareButton
        url={`${process.env.NEXT_PUBLIC_BASE_URI}/blog/${slug}`}
        quote={title}
      >
        <a href="#" className="facebook">
          <i className="fab fa-facebook-f"></i> Facebook
        </a>
      </FacebookShareButton>

      <TwitterShareButton
        url={`${process.env.NEXT_PUBLIC_BASE_URI}/blog/${slug}`}
        title={title}
      >
        <a href="#" className="twitter">
          <i className="fab fa-twitter"></i> Twitter
        </a>
      </TwitterShareButton>

      {/* <a href="#" className="google">
        <i className="fab fa-google"></i> Google+
      </a> */}
    </>
  );
};

export default SocialShare;
