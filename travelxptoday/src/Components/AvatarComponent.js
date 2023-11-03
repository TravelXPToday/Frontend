import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserCircleIcon, ChevronDownIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
/**
 * Renders a menu with options for the user's avatar.
 * @returns {JSX.Element} The AvatarMenu component.
 * Ai-generated comment
 */
function AvatarMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth0();
    const closeMenu = () => setIsMenuOpen(false);

    return (
        isAuthenticated && (
            <Menu  open={isMenuOpen} handler={setIsMenuOpen} >
                <MenuHandler>
                    <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.000001 pr-2 pl-0.5 lg:ml-auto"
                        
                    >
                        <Avatar
                            variant="circular"
                            size="sm"
                            alt={user.name}
                            className="border-2 border-pink-500 "
                            src={user.picture}
                        />
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                }`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1">
                    <MenuItem
                        onClick={closeMenu}
                        className="items-center gap-2 flex flex-row rounded 
                        hover:bg-teal-500 focus:bg-teal-500 active:bg-teal-500
                         hover:text-white focus:text-white active:text-white" 
                    >
                        {React.createElement(UserCircleIcon, {
                            className: `h-4 w-4 `,
                            strokeWidth: 2,
                            
                        })}
                        <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color="inherit"
                        >
                            <Link to="/profile" data-testid="ProfileButton">
                  Your profile
                </Link>
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={closeMenu}
                        className="items-center gap-2 flex flex-row rounded 
                        hover:bg-teal-500 focus:bg-teal-500 active:bg-teal-500
                         hover:text-white focus:text-white active:text-white "              
                    >
                        {React.createElement(Cog6ToothIcon, {
                            className: `h-4 w-4`,
                            strokeWidth: 2,
                        })}
                        <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color="inherit"
                        >
                            Settings(mock)
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        test-dataid="logout-button"
                        onClick={() => {
                            closeMenu();
                            logout({ logoutParams: { returnTo: window.location.origin } });
                        }}
                        className="flex items-center gap-2  flex-row rounded 
                        hover:bg-pink-500 focus:bg-pink-500 active:bg-pink-500
                        hover:text-white focus:text-white active:text-white "
                    >
                        {React.createElement(PowerIcon, {
                            className: `h-4 w-4`,
                            strokeWidth: 2,
                        })}
                        <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color="inherit"
                        >
                            Sign out
                        </Typography>
                    </MenuItem>

                </MenuList>
            </Menu>
        )
    );
}

export default AvatarMenu;