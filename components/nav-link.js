'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
// import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
    const path = usePathname();

    return (
        <Link
            href={href}
            // className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}
            className={`${path === href ? 'bg-black' : ''} text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
        >
            {children}
        </Link>
    )
}