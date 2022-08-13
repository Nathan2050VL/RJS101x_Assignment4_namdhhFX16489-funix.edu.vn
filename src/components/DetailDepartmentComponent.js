import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText} from 'reactstrap' 
import './style.css'
import { Link } from 'react-router-dom'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent'

function RenderDepartment ({ staffWithDepartment, isLoading, error }) {
    console.log(staffWithDepartment)
    if (isLoading) {
        return (
            <Loading />
        )
    } else if (error) {
        return (
            <div className="col-12">
                <h4>{this.props.staffsErrMess}</h4>
            </div>
        )
    } else {
        return(
        staffWithDepartment.map(staff => {
            return (
                <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-">
                    <Card>
                        <Link to={`/staffs/${staff.id}`} className="link-item">
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardText className="text-center">{staff.name}</CardText>
                        </Link>
                    </Card>
                </div>
            )
        })
        )
    }
}

function DetailDepartment (props) {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch(baseUrl + `departments/${props.departmentId}`)
        .then(res => {
                if (res.ok) {
                    return res
                } else {
                    let err = new Error('Error ' + res.status + ': ' + res.statusText)
                    err.res = res
                    throw err
                }
            },
            err => {
                let errmess = new Error(err.message)
                throw errmess
            })
        .then(res => res.json())
        .then(department => {
            setIsLoading(false)
            setItems(department)
        })
        .catch(err => {
            setIsLoading(false)
            setError(err)
        })
    }, [props.departmentId])


    return (
        <div className="container bg-custom">
            <div className="row">
                <RenderDepartment staffWithDepartment={items} isLoading={isLoading} error={error} />
            </div>
        </div>
    )
}

export default DetailDepartment;