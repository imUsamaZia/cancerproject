import HeadingBlock from "@/components/BlogPage/Blocks/HeadingBlock";
import ParagraphBlock from "@/components/BlogPage/Blocks/ParagraphBlock";
import ImageBlock from "@/components/BlogPage/Blocks/ImageBlock";
import ListsBlock from "@/components/BlogPage/Blocks/ListsBlock";
import MobileDetailsBlock from "./MobileDetailsBlock";

const DetailsBlock = ({ title, blocks, type }) => {

  return (
    <>
          <MobileDetailsBlock  title={title} blocks={blocks} />

          <div className="desktop-hidden text-15">
            {
              type === 'core/support' || type === 'core/financial'  ? <></> :
              <h3 className="pb-3">
              { title.replace(/(<([^>]+)>)/gi, "")}
            </h3>
            }
  
            {blocks?.map((block, index) => {
              return block.name === "core/heading" ? (
                <div className="cancer_heading">
                  <HeadingBlock
                    key={index}
                    content={block?.dynamicContent.replace(/(<([^>]+)>)/gi, "")}
                    textAlign={block?.attributes?.textAlign}
                    level={block?.attributes?.level}
                  />
                </div>
              ) : block.name === "core/paragraph" ? (
                <div className="cancer_paragraph text-15">
                  <ParagraphBlock
                    key={index}
                    content={block?.originalContent}
                    textAlign={block?.attributes?.textAlign}
                    dropCap={block?.attributes?.dropCap}
                  />
                </div>
              ) : block.name === "core/image" ? (
                <div className="cancer_image">
                  <ImageBlock
                    key={index}
                    url={block?.attributes?.url}
                    align={block?.attributes?.align}
                    width={block?.attributes?.width}
                    height={block?.attributes?.height}
                    alt={block?.attributes?.alt}
                  />
                </div>
              ) : block.name === "core/list" ? (
                <div className="cancer_list pb-3 text-15">
                  <ListsBlock
                    key={index}
                    align={block?.attributes?.align}
                    innerBlocks={block?.innerBlocks}
                  />
                </div>
              ) : block.name === "core/quote" ? (
                <div className="cancer_quote">
                  <QuoteBlock
                    key={index}
                    align={block?.attributes?.align}
                    innerBlocks={block?.innerBlocks}
                    textColor={block?.attributes?.textColor}
                    backgroundColor={block?.attributes?.backgroundColor}
                    citation={block?.originalContent.replace(/(<([^>]+)>)/gi, "")}
                  />
                </div>
              ) : block.name === "core/embed" ? (
                <div className="cancer_embed ">
                  <EmbedBlock
                    key={index}
                    url={block?.attributes?.url}
                    caption={block?.attributes?.caption}
                    content={block?.originalContent}
                  />
                </div>
              ) : block.name === "core/table" ? (
                <div className="cancer_table ">
                  <TableBlock key={index} content={block} />
                </div>
              ) : block.name === "core/gallery" ? (
                <div className="row images-outer ">
                  <GalleryBox images={block?.innerBlocks} />
                </div>
              ) : block.name === "core/buttons" ?(
                <div className="cus-btn-cancer pb-5 pt-3 ">
                <FindDocButton title={title.replace(/(<([^>]+)>)/gi, "")} />
              </div> 
              ) : null;
            })}
          </div>
    
    </>
  )
};

export default DetailsBlock;
