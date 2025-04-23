import Link from 'next/link'


function NavigationLinks() {
    return (<>
        <Link href="/" className="text-gray-700 hover:text-prinmary transition">خانه</Link>
        <Link href="/bookRequest" className="text-gray-700 hover:text-prinmary transition">درخواست کتاب</Link>
        <Link href="/aboutUs" className="text-gray-700 hover:text-prinmary transition">درباره ما</Link>
        <Link href="/contact" className="text-gray-700 hover:text-prinmary transition">تماس با ما</Link>
    </>
    )
}

export default NavigationLinks