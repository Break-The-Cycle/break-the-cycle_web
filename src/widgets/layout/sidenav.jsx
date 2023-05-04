import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes,role }) {
  const [cookies, setCookie, removeCookie] = useCookies(["default"]);
  console.log("123",cookies.cookie.role)
  const idRole = cookies.cookie.role
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
    main: "bg-main",
    sub1: "bg-SUB1",
    sub2: "bg-SUB2",
    bg_text1: "bg-BG_TEXT1",
    bg_text2: "bg-BG_TEXT2",
  };
  // console.log("sidenavColor",sidenavColor)

  return (
    <aside
      className={`${sidenavTypes["main"]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {/* sidebar 의 헤더*/}
            {/* break the cycle 이라고 적힌 부분 */}
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {/* 사이드바의 타이틀 */}
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {/* 사이드바 */}
            {/* pages들은 가장 외부의 routes.jsx 에서 선언 되었고, dashboard에서 sidebar를 선언하면서 넣어줌 */}
            {pages.map(({ icon, name, path, role }) => (
              <li key={name} >
                {role == idRole ?(
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    
                    
                    
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      // color={
                      //   isActive
                      //     ? sidenavColor
                      //     : sidenavType === "dark"
                      //     ? "white"
                      //     : "blue-gray"
                      //     ? "main"
                      //     : "sub1"
                      // }
                      color = {"white"}
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>):role =="all"?(
       <NavLink to={`/${layout}${path}`}>
       {({ isActive }) => (
         
         
         
         <Button
           variant={isActive ? "gradient" : "text"}
           // color={
           //   isActive
           //     ? sidenavColor
           //     : sidenavType === "dark"
           //     ? "white"
           //     : "blue-gray"
           //     ? "main"
           //     : "sub1"
           // }
           color = {"white"}
           className="flex items-center gap-4 px-4 capitalize"
           fullWidth
         >
           {icon}
           <Typography
             color="inherit"
             className="font-medium capitalize"
           >
             {name}
           </Typography>
         </Button>
       )}
     </NavLink>
                    ):(<></>)}
                
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Break The Cycle",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
