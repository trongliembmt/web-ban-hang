import React from "react";

function SectionBreadcrumb({breadcrumbs}) {
    return (
        <div className="my-breadcrumb">
            <ul className="container">
                {breadcrumbs.map((value, index) => (
                    <li key={index}><a href={value.link}>{index > 0 && <i className="fa fa-chevron-right"></i>} {value.name}</a></li>
                ))}
            </ul>
        </div>
    )
}

export default SectionBreadcrumb;