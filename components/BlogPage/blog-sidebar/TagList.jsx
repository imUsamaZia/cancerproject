import Link from "next/link";

const TagList = (props) => {
  const {tags} = props;

  return (
    <>
      {tags?.map((item, i) => (
        <li key={i}>
          <Link href="#">{item?.name}</Link>
        </li>
      ))}
    </>
  );
};

export default TagList;
