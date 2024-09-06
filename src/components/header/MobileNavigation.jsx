import { NavLink } from "react-router-dom"
import { mobileNavItems } from "../../constants/navigation"

const MobileNavigation = () => {
    return (
        <section className="lg:hidden fixed bg-neutral-600 bg-opacity-40 bottom-0 w-full h-auto p-4">
            <nav className=''>
                <ul className="flex items-center justify-between space-x-4 w-100">
                    {mobileNavItems.map((item, key) => (
                        <li key={`${key}-mobile`}>
                            <NavLink
                                to={`/${item.href}`}
                                className={({ isActive }) => `transition-all flex flex-col text-xl items-center gap-2 hover:text-primary ${isActive ? "text-primary" : "text-neutral-400"}`}>
                                <span className="text-2xl">{item.icon}</span>
                                <span>
                                    {item.label}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    )
}

export default MobileNavigation
