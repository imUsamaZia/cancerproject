'use client'

import { useRouter } from "next/navigation";
const BlogPagination = (props) => {
  const {pageInfo} = props;
  const router = useRouter();

  const handleNext = () => {
    if(pageInfo?.hasNextPage) {
      router.push(`/blog?endCursor=${pageInfo?.endCursor}`,{scroll: false});
    }
  }
  const handlePrev = () => {
    if(pageInfo?.hasPreviousPage) {
      router.push(`/blog?startCursor=${pageInfo?.startCursor}`,{scroll: false});
    }
  }



  return (
    <nav className="ls-pagination">
      
      <ul className="flex items-center">
        {
          // pageInfo?.hasPreviousPage && (
            
          // )
          <li className="prev">
              <button className={`${pageInfo?.hasPreviousPage ? '' : 'cursor-disabled'}`}  onClick={handlePrev}>
                <i className={`fa fa-arrow-left ${pageInfo?.hasPreviousPage ? '' : 'text-gray'}`}></i>
              </button>
            </li>
        }
        {/* End li */}

        {

          <li className="next">
              <button className={`${pageInfo?.hasNextPage ? '' : 'cursor-disabled'}`} onClick={handleNext}>
                <i className={`fa fa-arrow-right ${pageInfo?.hasNextPage ? '' : 'text-gray'}`}></i>
              </button>
            </li>
        }
      </ul>
    </nav>
  );
};

export default BlogPagination;
