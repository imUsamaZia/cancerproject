import parseHtml from "@/lib/Parser"

export default function TableBlock({ content }) {
  console.log(content)
  return (
    <div className="table-block">
        {parseHtml(content?.originalContent)}
    </div>
  )
}

                    






