"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { ConnectWallet } from "@/modules/wallet";
import { useAndromedaStore } from "@/zustand/andromeda";
import { Navigation } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

const navigationMenuTriggerStyle = () => `
    bg-black text-white px-4 py-2 rounded-md
    hover:bg-gray-800
`;

const Navbar = (props: Props) => {
    const { accounts } = useAndromedaStore();
    const account = accounts[0];
    const address = account?.address ?? "";
    const truncatedAddress =
        address.slice(0, 6) + "......" + address.slice(address.length - 4);

    return (
        <div className="p-4 z-40">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="gap-4">
                    <NavigationMenuItem>
                        <img
                            src="/Ticket3_Logo.png"
                            alt="Ticket3 Logo"
                            className="w-[40px] h-[40px]"
                        />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/events" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Events
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/event-wallet" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Event Wallet
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/event-wallet" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Join Ticket3 Shares
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/admin" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Admin
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <ConnectWallet />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default Navbar;
