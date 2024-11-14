import parseHtml from "@/lib/Parser";
function getClassName(align) {
  if (align === "center" || align === "right") {
    return `text-${align}`;
  }

  return "text-left ";
}

export default function ListsBlock({
  align,
  anchor,
  backgroundColor,
  className,
  content,
  dropCap,
  style,
  textColor,
  innerBlocks,
}) {
  return (
    <ul className={`${getClassName(align)} cancer-block-list block-lists`}>
      {innerBlocks.map((block, index) => (
        <li key={index}>{parseHtml(block?.originalContent)}</li>
      ))}
    </ul>
  );
}
