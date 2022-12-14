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
                        <Fade><CardTitle>H??? v?? t??n: {staff.name}</CardTitle></Fade>
                        <Fade><CardText>Ng??y sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ng??y v??o c??ng ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Ph??ng ban: {department}</CardText>
                        <CardText>S??? ng??y ngh??? c??n l???i: {staff.annualLeave}</CardText>
                        <CardText>S??? ng??y ???? l??m th??m: {staff.overTime}</CardText></Fade>
                        <Fade>
                            <CardText>
                                <Button outline color="dark" className="mt-2 mr-2" 
                                onClick={() =>{this.toggleModal(); this.setState({ doB: dateFormat(this.props.staff.doB, "yyyy-mm-dd"), startDate: dateFormat(this.props.staff.startDate, "yyyy-mm-dd")})}}>
                                <i className="fa fa-pencil" aria-hidden="true"></i> S???a nh??n vi??n</Button>
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
                                <Link to="/staffs">Nh??n vi??n</Link>
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
                        S???a nh??n vi??n
                    </ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="p-3">
                            <Row className="form-group">
                                <Label htmlFor="name" md={5}>T??n</Label>
                                <Col md={7}>
                                    <Control.text model=".name" name="name" placeholder="Nh???p t??n" id="name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Y??u c???u nh???p',
                                            minLength: 'Y??u c???u nhi???u h??n 2 k?? t???',
                                            maxLength: 'Y??u c???u ??t h??n 30 k?? t???'
                                        }}
    
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={5}>Ng??y sinh</Label>
                                <Col md={7}>
                                    <Control type="date" model=".doB" name="doB" placeholder="Nh???p t??n" id="doB" className="form-control"
                                        value={this.state.doB}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Y??u c???u nh???p'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={5}>Ng??y v??o c??ng ty</Label>
                                <Col md={7}>
                                    <Control type="date" model=".startDate" name="startDate" placeholder="Nh???p t??n" id="startDate" className="form-control"
                                        value={this.state.startDate}
                                        onChange={this.handleInputDate}
                                        validators={{ required }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Y??u c???u nh???p'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={5}>Ph??ng ban</Label>
                                <Col md={7}>
                                    <Control.select model=".department" name="department" placeholder="Nh???p t??n" id="department" className="form-control">
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={5}>H??? s??? l????ng</Label>
                                <Col md={7}>
                                    <Control.text model=".salaryScale" name="salaryScale" placeholder="Nh???p t??n" id="salaryScale" className="form-control"
                                        defaultValue={1}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={5}>S??? ng??y ngh??? c??n l???i</Label>
                                <Col md={7}>
                                    <Control.text model=".annualLeave" name="annualLeave" placeholder="Nh???p t??n" id="annualLeave" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={5}>S??? ng??y ???? l??m th??m</Label>
                                <Col md={7}>
                                    <Control.text model=".overTime" name="overTime" placeholder="Nh???p t??n" id="overTime" className="form-control"
                                        defaultValue={0}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">S???a</Button>
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