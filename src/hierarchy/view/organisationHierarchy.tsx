import { Input } from "antd"
import EmployeeComponent from "../../components/employeeComponent"
import useHierarchy from "../hook/useHierarchy"
import styles from './styles/organisationHierarchy.module.css'

function OrganisationHierarchy() {
    const {
        employees,
        filteredEmployee,
        searchEmployeeByName,
        updateEmployeeDetails
    } = useHierarchy()

    console.log("search ", filteredEmployee)
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Your Organization</h1>
            </div>
            <Input placeholder="Enter Name" className={styles.input} onChange={searchEmployeeByName} />

            {filteredEmployee.map((employee) => (
                <EmployeeComponent
                    key={employee.id}
                    employee={employee}
                    updateEmployeeDetails={updateEmployeeDetails}
                />
            ))}
            {employees.map((employee) => (
                <EmployeeComponent
                    key={employee.id}
                    employee={employee}
                    updateEmployeeDetails={updateEmployeeDetails}
                />
            ))}

        </div>

    )
}

export default OrganisationHierarchy