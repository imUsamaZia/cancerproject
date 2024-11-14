'use client';

import React, { useState } from 'react';

const Faqs = ({ data, nobg }) => {
  const [open, setOpen] = useState(null);
  const handleFaq = (idx) => {
    if (idx === open) {
      return setOpen(null);
    }
    setOpen(idx);
  };
  const faqs = data.find((item) => item?.name === "themeisle-blocks/accordion")?.innerBlocks


  return (
    <section className={`faqs ${nobg && "nobg"}`}>
      <div className="faq_wrapper">
        <h2 className="title">Frequently Asked Questions</h2>
        <div className="faqs_list">
          {faqs?.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`faq ${faqs?.length === idx + 1 && 'last_faq'}`}
              >
                <div className={`head`} onClick={() => handleFaq(idx)}>
                  <h6>{item?.attributes?.title}</h6>
                  {open === idx ? (
                    <button className="menus">
                      <span>_</span>
                    </button>
                  ) : (
                    <button className="plus">
                      <span>+</span>
                    </button>
                  )}
                </div>
                {open === idx && (
                  item?.innerBlocks?.map((i, id) => (
                    <div
                      className="body"
                      key={id}
                      dangerouslySetInnerHTML={{ __html: i?.originalContent }}
                    />
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
