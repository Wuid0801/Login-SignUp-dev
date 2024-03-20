import { ModeToggle } from './mode-toggle';
import { Link } from 'react-router-dom';
export const Navbar = () => {
    return (
        <>
            <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 w-full z-10 top-0">
                <div className="container flex items-center justify-between">
                    <ModeToggle />
                    <div  className="text-black">
                        <Link to="/" >
                            Login
                        </Link>
                        &nbsp;/&nbsp;
                        <Link to="/signup">
                            SignUp
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
