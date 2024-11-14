import Link from "next/link";

const Social = (props) => {
  const { socials } = props;


  return (
    
    <div className="social-links">
      {
        socials?.facebook && 
        <Link target="__blank"  href={socials?.facebook || ''}>
        { <i className="fab fa-facebook-f"></i>}
      </Link>
      }
      {
        socials?.twitter && 
        <Link target="__blank" href={socials?.twitter || ''}>
        { <i className="fab fa-twitter"></i>}
      </Link>
      }
      {
        socials?.instagram && 
        <Link target="__blank" href={socials?.instagram || ''}>
        { <i className="fab fa-instagram"></i>}
      </Link>
      }
      {
        socials?.linkedin && 
        <Link target="__blank" href={socials?.linkedin || ''}>
        { <i className="fab fa-linkedin-in"></i>}
      </Link>
      }

 

    </div>
  );
};

export default Social;
