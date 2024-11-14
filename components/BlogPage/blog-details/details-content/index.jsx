'use client'
import SocialShare from "./SocialShare";
import Tag from "./Tag";
import HeadingBlock from "../../Blocks/HeadingBlock";
import ParagraphBlock from "../../Blocks/ParagraphBlock";
import ImageBlock from "../../Blocks/ImageBlock";
import ListsBlock from "../../Blocks/ListsBlock";
import QuoteBlock from "../../Blocks/QuoteBlock";
import EmbedBlock from "../../Blocks/EmbedBlock";
import TableBlock from "../../Blocks/TableBlock";

const index = (props) => {

  const {postBlocks,categories,title, slug} = props;
  // console.log(postBlocks);
  const blocks = postBlocks ? JSON.parse(postBlocks) : [];


  return (
    <div className="auto-container">

    {
      blocks?.map((block, index) => (
        block.name === "core/heading" ? (
          <HeadingBlock key={index} content={block?.dynamicContent.replace(/(<([^>]+)>)/gi, "")} textAlign={block?.attributes?.textAlign} level={block?.attributes?.level}/>
        ): block.name === "core/paragraph" ?(
            <ParagraphBlock key={index} content={block?.originalContent} textAlign={block?.attributes?.textAlign} dropCap={block?.attributes?.dropCap}/>
        ): block.name === "core/image" ?(
          <ImageBlock key={index} url={block?.attributes?.url} align={block?.attributes?.align} width={block?.attributes?.width} height={block?.attributes?.height} alt={block?.attributes?.alt}/>
        ): block.name === "core/list" ?(
          <ListsBlock key={index} align={block?.attributes?.align} innerBlocks={block?.innerBlocks}/>
        ): block.name === "core/quote" ?(
          <QuoteBlock key={index} align={block?.attributes?.align}  innerBlocks={block?.innerBlocks} textColor={block?.attributes?.textColor} backgroundColor={block?.attributes?.backgroundColor} citation={block?.originalContent.replace(/(<([^>]+)>)/gi, "")}/>
        ): block.name === "core/embed" ?(
          <EmbedBlock key={index} url={block?.attributes?.url} caption={block?.attributes?.caption} content={block?.originalContent}/>
        ): block.name === "core/table" ?(
          <TableBlock key={index} content={block}/>
        ): null
      ))
    }



      <div className="other-options">
        <div className="social-share">
          <h5>Share this post</h5>
          <SocialShare title={title} slug={slug} />
        </div>
        {/* End social-share */}

        <Tag categories={categories} />
      </div>
      {/* End other share */}

      {/* <div className="post-control">
        <Pagination />
      </div> */}
      {/* <!-- Post Control --> */}

      {/* <div className="comments-area">
        <CommentBox />
      </div> */}

      {/* <!-- Comments area --> */}

      {/* <!-- Comment Form --> */}
      {/* <div className="comment-form default-form">
        <h4>Leave your thought here</h4>
        <Form />
      </div> */}
      {/* <!--End Comment Form --> */}
    </div>
  );
};

export default index;
