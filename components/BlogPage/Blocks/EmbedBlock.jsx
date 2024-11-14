export default function EmbedBlock({content, url, caption }) {

  return (
    <div className="embed-block p-5">
      <figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio">
        <div class="wp-block-embed__wrapper">
          <iframe
            title="Gutenberg in Headless WordPress: WPGraphQL Gutenberg"
            width="100%"
            height="381"
            src={`${url}`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen=""
          ></iframe>
        </div>
        <figcaption class="wp-element-caption">{caption}</figcaption>
      </figure>
    </div>
  );
}
