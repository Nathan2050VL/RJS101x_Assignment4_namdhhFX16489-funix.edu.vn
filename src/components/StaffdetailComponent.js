import React, { Component } from 'react';
import { CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import './style.css'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { Loading } from './LoadingComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class StaffDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen})
    }

    renderStaff(staff, staffsLoading, staffsErrMess){
        let department = ''
        switch (staff.departmentId) {
            case 'Dept01':
                department = 'Sale'
                break;
            case 'Dept02':
                department = 'HR'
                break;
            case 'Dept03':
                department = 'Marketing'
                break;
            case 'Dept04':
                department = 'IT'
                break;
            case 'Dept05':
                department = 'Finance'
                break;
            default: department = ''
        }
        if (staffsLoading) {
            return (
                <Loading />
            )
        } else if (staffsErrMess) {
            return (
                <h4>{staffsErrMess}</h4>
            )
        } else if(staff){
            return (
                <div className="row pb-3">
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                            <CardImg src={staff.image} />
                        </FadeTransform>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-9">
                    <Stagger in>
                        <Fade><CardTitle>Họ và tên: {staff.name}</CardTitle></Fade>
                        <Fade><CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {department}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText></Fade>
                        <Fade>
                            <CardText>
                                <Button outline color="dark" className="mt-2 mr-2" 
                                onClick={() =>{this.toggleModal(); this.setState({ doB: dateFormat(this.props.staff.doB, "yyyy-mm-dd"), startDate: dateFormat(this.props.staff.startDate, "yyyy-mm-dd")})}}>
                                <i className="fa fa-pencil" aria-hidden="true"></i> Sửa nhân viên</Button>
                            </CardText>
                        </Fade>
                    </Stagger>
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
    }

    render() {
        if (this.props.staff){
            return (
                <div className="container bg-custom">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/staffs">Nhân viên</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {this.props.staff.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.staff.name}</h3>
                            <hr />
                        </div>
                    </div>
                    {this.renderStaff(this.props.staff, this.props.staffsLoading, this.props.staffsErrMess)}

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Sửa nhân viên
                    </ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="p-3">
                            <Row className="form-group">
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Control.text model=".name" name="name" placeholder="Nhập tên" id="name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                                            maxLength: 'Yêu cầu ít hơn 30 ký tự'
                                        }}
    
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Control type="date" model=".doB" name="doB" placeholder="Nhập tên" id="doB" className="form-control"
                                        value={this.state.doB}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Control type="date" model=".startDate" name="startDate" placeholder="Nhập tên" id="startDate" className="form-control"
                                        value={this.state.startDate}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                <Col md={7}>
                                    <Control.select model=".department" name="department" placeholder="Nhập tên" id="department" className="form-control">
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Control.text model=".salaryScale" name="salaryScale" placeholder="Nhập tên" id="salaryScale" className="form-control"
                                        defaultValue={1}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Control.text model=".annualLeave" name="annualLeave" placeholder="Nhập tên" id="annualLeave" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Control.text model=".overTime" name="overTime" placeholder="Nhập tên" id="overTime" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Sửa</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            )
        }else {
            return (
                <div></div>
            ) 
        }
    }

}
    



export default StaffDetail;