import React from "react";

export type NavItem = {
    title: string;
    href: string;
}

export type Technology = {
    name: string
    icon: React.ComponentType<{ size?: number }>
}