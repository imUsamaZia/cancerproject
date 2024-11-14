const Tag = (props) => {
  const {categories} = props;
  return (
    <div className="tags">
      {
        categories?.map((category, index) => (
          <a key={index} href={`#`}>{category.name}</a>
        ))
      }
      {/* <a href="#">App</a>
      <a href="#">Design</a>
      <a href="#">Digital</a> */}
    </div>
  );
};

export default Tag;
