import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Logo from "@/components/Logo";
const MobileMenu = () => {
  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                    <Logo width="130" height="30" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <button
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1 text-white"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
