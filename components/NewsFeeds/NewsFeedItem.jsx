"use client";
import {
  InstagramEmbed,
  TikTokEmbed,
  XEmbed,
  FacebookEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";

export default function NewsFeedItem(props) {
  const { item } = props;
  const url = item?.newsFeedOptions?.videoUrl;

  const checkUrl = ({ url, word }) => {
    const regex = new RegExp("\\b" + word + "\\b");
    return regex.test(url);
  };

  const isTiktok = checkUrl({ url, word: "tiktok" });
  const isYoutube = checkUrl({ url, word: "youtu.be" });
  const isVimeo = checkUrl({ url, word: "vimeo" });
  const isFacebook = checkUrl({ url, word: "facebook" });
  const isInstagram = checkUrl({ url, word: "instagram" });
  const isTwitter = checkUrl({ url, word: "twitter" });

  return (
    <div className="news_feed_item border p-2 rounded my-3">
      {isTiktok ? (
        <TikTokEmbed
          url={url}
          width="100%"
        />
      ) : isYoutube ? (
        <YouTubeEmbed
          url={url}
          width="100%"
          height={220}
        />
      ) : isTwitter ? (
        <XEmbed
          url={url}
          width="100%"
        />
      ) : isFacebook ? (
        <FacebookEmbed
          url={url}
          width="100%"
        />
      ) : isInstagram ? (
        <InstagramEmbed
          url={url}
          width="100%"
        />
      ) : null}
      <div className="news_feed_content pt-3 pb-1 px-2 ">
        <h5 className=" capitalize ">{item?.title}</h5>
      </div>
    </div>
  );
}
