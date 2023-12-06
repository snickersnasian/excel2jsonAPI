import { MenuItem } from "../types";


export const getMenuItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void,
    children?: MenuItem[],
) => {
    return {
        key,
        icon,
        children,
        onClick,
        label,
    } as MenuItem;
}