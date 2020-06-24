import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const Navbar = () => {
  const context = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const navigationBar = context.user ? (
    <Menu pointing secondary size='huge' color='red'>
      <Menu.Item name={context.user.username} active as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item name='logout' as={Link} to='/login' onClick={context.logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='huge' color='red'>
      <Menu.Item
        name='home'
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );
  return navigationBar;
  // <Menu pointing secondary size='huge' color='red'>
  //   <Menu.Item
  //     name='home'
  //     active={activeItem === "home"}
  //     onClick={handleItemClick}
  //     as={Link}
  //     to='/'
  //   />
  //   <Menu.Menu position='right'>
  //     <Menu.Item
  //       name='login'
  //       active={activeItem === "login"}
  //       onClick={handleItemClick}
  //       as={Link}
  //       to='/login'
  //     />
  //     <Menu.Item
  //       name='register'
  //       active={activeItem === "register"}
  //       onClick={handleItemClick}
  //       as={Link}
  //       to='/register'
  //     />
  //   </Menu.Menu>
  // </Menu>
};

export default Navbar;
