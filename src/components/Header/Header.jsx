import logo from '../../assets/logo.png'

export default function Header(){

    return(
        <header className='flex items-center justify-center bg-[#141413] text-white h-[200px]'>
        <img src={logo} alt="" />
        <h1 className='bebas-neue-regular text-5xl p-5'>Chef Ai</h1>
        </header>
    )
}