import React from 'react';
import { Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import './style.css'
import { Loading } from './LoadingComponent'


function RenderDepartment({ department }) {
    return(
        <div className="col-lg-4 col-md-6 col-sm-12">
            <Link to={`/departments/${department.id}`} className="link-item">
                <Card className="mb-3 p-2"> 
                    <CardTitle>{department.name}</CardTitle>
                    <CardText className="ml-2">Số lượng nhân viên: {department.numberOfStaff}</CardText>
                </Card>
            </Link>
        </div>
    )
}

function Departments(props) {
    const departments = props.department.map(department =>{
        return (
                <RenderDepartment key={department.id} department={department} />
        )
    })
    if (props.departmentsLoading) {
        return (
            <div className="container bg-custom">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if (props.departmentsErrMess) {
        return (
            <div className="container bg-custom">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.departmentsErrMess}</h4>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container bg-custom">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/staffs">Nhân viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Phòng ban
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Phòng ban</h3>
                        <hr />
                    </div>
                </div>
                <div className="row mt-3 pb-3">
                    {departments}
                </div>
            </div>
        )
    }
}

export default Departments;