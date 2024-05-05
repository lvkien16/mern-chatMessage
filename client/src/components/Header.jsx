import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navbar className="border-b-2">
      <Link
        to="/home"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span>Zene</span>
      </Link>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 sm:inline" color={"gray"} pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.avatar} rounded />}
          >
            <Dropdown.Header>
              <div className="flex items-center mb-2 gap-2">
                <Avatar alt="user" img={currentUser.avatar} rounded />
                <span>{currentUser.name}</span>
              </div>
              <Link to="/profile/">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Item>Sign out</Dropdown.Item>
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
        <Navbar.Link active={path === "/home"} as={"div"}>
          <Link to="/home"> Home</Link>
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
