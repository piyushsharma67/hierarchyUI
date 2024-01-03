import React, { useCallback, useState } from "react";
import styles from './employee.module.css'
import { Button, Input, Popover, Tag } from 'antd';
import { TEmployee } from "../redux/types/organisationHierarchyType";

interface EmployeeProps {
    employee: TEmployee;
    updateEmployeeDetails: ({ name, email, phone, id }: { name: string, email: string, phone: string, id: number }) => void
}

type TEditFormState = {
    name: string,
    email: string,
    phone: string
}

function EmployeeComponent(props: EmployeeProps) {

    var colours = ['green', "magenta", "red", 'cyan', "blue", 'purple', 'orange']

    const [isEditOpen, setIsEditOpen] = useState(false)

    const Content = useCallback(() => {
        return (
            <>
                <p>ID: {props.employee.id}</p>
                <p>Name: {props.employee.name}</p>
                <p>Email: {props.employee.email}</p>
                <p>Phone: {props.employee.phone}</p>
            </>
        )
    }, [props.employee])

    const toggleEditFlow = useCallback(() => {
        setIsEditOpen(!isEditOpen)
    }, [isEditOpen])


    const [state, setState] = useState<TEditFormState>({
        name: "",
        email: "",
        phone: ""
    })

    function setDetails(type: keyof TEditFormState) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setState(state => {
                return {
                    ...state, [type]: e.target.value
                }
            })
        }
    }

    const updateEmployeeDetails = useCallback(() => {
        props.updateEmployeeDetails({
            id: props.employee.id,
            name: state.name,
            email: state.email,
            phone: state.phone
        })
        setIsEditOpen(false)
    }, [props.employee, state])

    return (
        <div className={styles.container}>

            <div className={styles.tagContainer}>
                <Popover placement="right" title={props.employee.name} content={<Content />}>
                    <Tag color={colours[(Math.floor(Math.random() * colours.length))]} className={styles.tags}>{props.employee.name}</Tag>
                </Popover>
                <Button onClick={toggleEditFlow}>Edit</Button>
            </div>
            {isEditOpen && <div>
                <Input placeholder="Enter Name" className={styles.input} onChange={setDetails('name')} />
                <Input placeholder="Enter Email" className={styles.input} onChange={setDetails('email')} />
                <Input placeholder="Enter Phone" className={styles.input} onChange={setDetails('phone')} />

                <Button onClick={updateEmployeeDetails} type="primary">Submit</Button>
            </div>}

            {props.employee.children && (
                <ul>
                    {props.employee.children.map((child) => (
                        <li key={child.id}>
                            <EmployeeComponent
                                employee={child}
                                updateEmployeeDetails={props.updateEmployeeDetails}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default React.memo(EmployeeComponent)