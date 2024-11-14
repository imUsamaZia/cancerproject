import parseHtml from "@/lib/Parser";

function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }
  
    return "text-left";
  }
  
  export default function ParagraphBlock({
    align,
    anchor,
    backgroundColor,
    className,
    content,
    dropCap,
    style,
    textColor,
  }) {
    return <div className={`${getClassName(align)} ${className}`}>{parseHtml(content)}</div>;
  }