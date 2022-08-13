import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import './style.css'
import { Loading } from './LoadingComponent'


class PayRoll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sort: null,
        }

    }


    render() {
        const payRoll = this.props.staffs.map((staff) =>{
            const salary = Math.trunc(staff.salaryScale * 3000000 + staff.overTime * 200000)
            return (
                <div key={staff.id} className="col-lg-4 col-md-6 col-sm-12">
                    <Card className="mb-4 p-2">
                        <CardTitle>{staff.name}</CardTitle>
                        <CardBody>
                            <CardText>Mã nhân viên: {staff.id}</CardText>
                            <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                            <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                            <CardText>Lương: {salary}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        })

        if (this.props.payrollsLoading) {
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.payrollsErrMess) {
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <div className="col-12">
                            <h4>{this.props.payrollsErrMess}</h4>
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
                                Bảng lương
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-9">
                                    <h3>Bảng lương</h3>
                                </div>
                                <div className="col-12 col-md-3">
                                    <button className="btn-sort" onClick={this.sorting}>
                                        <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>Sắp xếp theo lương
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row mt-3">
                        {payRoll}
                    </div>
                </div>
            )
        }

    }
}

export default PayRoll