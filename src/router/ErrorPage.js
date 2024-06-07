import '../css/error-page.css'

export default function ErrorPage() {
    return (
        <section className="page-404">
            <div className="container text-center">
                <h1>404</h1>
                <div className="bg-404 d-inline-block"></div>
                <div className="content-404">
                    <h3 className="h2">Page not found</h3>
                    <p>The page you are looking for not available!</p>
                    <a href="/" className="link-404">Go to Home</a>
                </div>
            </div>
        </section>
    )
}