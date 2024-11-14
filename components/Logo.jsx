import Image from "next/image";

export default function Logo(props) {
  const { width, height } = props;
  return (
    <>
      <Image src="/Artboard 60.svg" alt="logo" width={width || 160} height={height || 60} />
    </>
  );
}
