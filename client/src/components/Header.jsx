import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span>Zene</span>
      </Link>

      <div className="flex justify-end gap-1 md:order-2 w-4/5 md:w-auto">
        {/* <Button
          className="w-12 h-10 sm:inline"
          color={"gray"}
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button> */}
        <form className="flex md:pr-10 items-center">
          <input
            type="text"
            name="search"
            className="w-40 md:w-52 rounded-full rounded-r-none py-1 h-8"
            placeholder={`Search`}
          />

          <button
            type="submit"
            className="border border-emerald-700 border-l-0 w-10 md:w-14 h-8 flex items-center rounded-full rounded-l-none justify-center hover:bg-emerald-700 hover:text-white"
          >
            <CiSearch />
          </button>
        </form>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.avatar} rounded />}
          >
            <Dropdown.Header>
              <div className="flex items-center mb-2 gap-2">
                <Avatar
                  alt="user"
                  img={currentUser.avatar}
                  rounded
                  className="border-2 rounded-full border-emerald-700 "
                />
                <span>{currentUser.name}</span>
              </div>
              <Link to={`/profile/${currentUser._id}`}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown.Header>
          </Dropdown>
        ) : (
          <Link to="/sign-in" className="flex items-center">
            <button className="border hover:border-emerald-700 text-white bg-emerald-700 hover:bg-transparent hover:text-emerald-700 p-2 rounded">
              Sign in
            </button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/"> Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/messages"} as={"div"}>
          <Link to="/messages">Messages</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/friends"} as={"div"}>
          <Link to="/friends">Friends</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/notifications"} as={"div"}>
          <Link to="/notifications">Notifications</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
