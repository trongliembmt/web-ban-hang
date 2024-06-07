import Header from '../Commons/Header'
import Footer from '../Commons/Footer'
import Banner from '../HomePage/Banner'
import SectionProductsFeatured from '../HomePage/SectionProductsFeatured'

function HomePage(){
    return(
        <div>
            <Header/>
            <Banner/>
            <SectionProductsFeatured/>
            <Footer/>
        </div>
    )
}

export default HomePage;