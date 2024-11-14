'use client'
import { useRouter } from "next/navigation";



const SearchBox = () => {
  const router = useRouter();

  const handleOnchange = (e) => {
    e.preventDefault();
    const search = e.target.value;
    router?.push(`/blog?search=${search}`)
  };


  return (
    <form    >
      <div className="form-group">
        <span className="icon flaticon-search-1"></span>
        <input
          onChange={(e) => handleOnchange(e)}
          type="search"
          name="search-field"
          placeholder="keywords"
          required
        />
      </div>
    </form>
  );
};

export default SearchBox;
