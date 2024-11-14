import Link from "next/link";

const Categories = (props) => {
  const {categories} = props;
  return (
    <>
      {categories?.map((item, i) => (
        <li key={item?.id}>
          <Link href="#">{item?.name}</Link>
        </li>
      ))}
    </>
  );
};

export default Categories;
