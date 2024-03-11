// importing link
import Link from "next/link";
// importing router
import { useRouter } from "next/router";
// importing icons
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";


export default function Nav({ show }) {
  const inactiveLink = 'flex gap-1 p-1 items-center justify-center h-[3rem]';
  const activeLink = inactiveLink + ' bg-[#000] text-white rounded-sm ';
  const inactiveIcon = 'w-6 h-6  ';
  const activeIcon = inactiveIcon + ' text-grey';
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className={(show ? 'left-0' : '-left-full') + " top-0 grey_text bg-anti-flash-white p-4 fixed w-full  min-h-screen md:static md:w-auto transition-all ease-in-out duration-500 z-[3]"}>
      <div className="mb-4 flex items-center justify-center w-full  ">
        <h3 className="font-bold">ZENBOARD</h3>
      </div>
      <nav className="flex flex-col gap-2 mt-10 ">
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <div className={pathname === '/' ? activeIcon : inactiveIcon}>
            <AiOutlineAppstore size={20} />
          </div>
          Home
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/products') ? activeIcon : inactiveIcon}>
            <AiOutlineShop size={20} />
          </div>
          Products
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/categories') ? activeIcon : inactiveIcon}>
            <AiOutlineFolderOpen size={20} />
          </div>
          Categories
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/orders') ? activeIcon : inactiveIcon}>
            <AiOutlineShoppingCart size={20} />
          </div>
          Orders
        </Link>
        <Link href={'/blog'} className={pathname.includes('/blog') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/blog') ? activeIcon : inactiveIcon}>
            <AiOutlineUsergroupAdd size={20} />
          </div>
          Blog
        </Link>
        <Link href={'/customization'} className={pathname.includes('/customization') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/customization') ? activeIcon : inactiveIcon}>
            <AiOutlineUsergroupAdd size={20} />
          </div>
          Customization
        </Link>
        <Link href={'/admins'} className={pathname.includes('/admins') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/admins') ? activeIcon : inactiveIcon}>
            <AiOutlineUsergroupAdd size={20} />
          </div>
          Admins
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/settings') ? activeIcon : inactiveIcon}>
            <AiFillSetting size={20} />
          </div>
          Settings
        </Link>
      </nav>
    </div>
  );
}