

'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

const GalleryBox = (props) => {
  const { images } = props;
  return (
    <>
      <Gallery>
        {images?.map((singleItem) => (
          <div className="col-lg-3 col-md-3 col-sm-6" key={singleItem.id}>
            <figure className="image" role="button">
              <Item
                original={singleItem?.attributes?.url}
                thumbnail={singleItem?.attributes?.url}
                width={190}
                height={167}
              >
                {({ ref, open }) => (
                  <div className="lightbox-image" ref={ref} onClick={open}>
                    <Image
                      width={190}
                      height={167}
                      src={singleItem?.attributes?.url}
                      alt="resource"
                    />
                  </div>
                )}
              </Item>
            </figure>
          </div>
        ))}
      </Gallery>
    </>
  );
};

export default GalleryBox;
