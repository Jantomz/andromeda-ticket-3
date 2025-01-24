"use client";
import { Box, Divider } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import PoweredByLogo from "@/modules/ui/PoweredByLogo";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
    children?: ReactNode;
}
const Layout: FC<LayoutProps> = (props) => {
    const { children } = props;

    return (
        <Box minH="100vh">
            <Box>
                <Navbar />
            </Box>
            <Divider />
            <Box px="24" py="16">
                {children}
            </Box>
            <PoweredByLogo />
            {/* <Box>
        <Footer />
      </Box> */}
            <Toaster />
        </Box>
    );
};
export default Layout;
