import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true))
    return fetch(baseUrl + 'staffs')
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
                let errmess = new Error('Đã có lỗi xảy ra!')
                throw errmess
            })
        .then(res => res.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(err => dispatch(staffsFailed(err.message)))
}

export const staffsLoading = () => ({
    type: ActionTypes.LOADING_STAFFS
})

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
})

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
})

export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true))
    return fetch(baseUrl + 'departments')
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
        .then(departments => dispatch(addDepartments(departments)))
        .catch(err => dispatch(departmentsFailed(err.message)))
}

export const departmentsLoading = () => ({
    type: ActionTypes.LOADING_DEPARTMENTS
})

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
})

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
})

export const fetchPayrolls = () => (dispatch) => {
    dispatch(payrollsLoading(true))
    return fetch(baseUrl + 'staffsSalary')
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
        .then(payrolls => dispatch(addPayrolls(payrolls)))
        .catch(err => dispatch(payrollsFailed(err.message)))
}

export const payrollsLoading = () => ({
    type: ActionTypes.LOADING_PAYROLLS
})

export const payrollsFailed = (errmess) => ({
    type: ActionTypes.PAYROLLS_FAILED,
    payload: errmess
})

export const addPayrolls = (payrolls) => ({
    type: ActionTypes.ADD_PAYROLLS,
    payload: payrolls
})
