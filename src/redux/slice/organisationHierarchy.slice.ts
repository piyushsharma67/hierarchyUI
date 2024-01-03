import { createSlice } from "@reduxjs/toolkit";
import { TEmployee, TOrganisationHierarchy } from "../types/organisationHierarchyType";

const initialState: TOrganisationHierarchy = {
    employees: [{
        id: 1,
        name: 'CEO',
        email: "ceo@xyz.com",
        phone: "1234567892",
        position: 'Chief Executive Officer',
        children: [
            {
                id: 2,
                name: 'HR',
                position: 'Human Resources',
                email: "hr@xyz.com",
                phone: "1234567892",
                children: [
                    {
                        id: 5,
                        name: 'HR Team Lead',
                        position: 'HR Team Lead',
                        email: "hrTl1@xyz.com",
                        phone: "1234567892",
                        children: [
                            {
                                id: 9, name: 'Team Member 1', position: 'HR Team Member', email: "ceo@xyz.com",
                                phone: "1234567892",
                            },
                            {
                                id: 10, name: 'Team Member 2', position: 'HR Team Member', email: "ceo@xyz.com",
                                phone: "1234567892",
                            },
                        ],
                    },
                ],
            },
            {
                id: 3,
                name: 'HOD',
                position: 'Head of Department',
                email: "ceo@xyz.com",
                phone: "1234567892",
                children: [
                    {
                        id: 6,
                        name: 'HOD Team Lead',
                        position: 'HOD Team Lead',
                        email: "ceo@xyz.com",
                        phone: "1234567892",
                        children: [
                            {
                                id: 11, name: 'Team Member 3', position: 'HOD Team Member', email: "ceo@xyz.com",
                                phone: "1234567892",
                            },
                            {
                                id: 12, name: 'Team Member 4', position: 'HOD Team Member', email: "ceo@xyz.com",
                                phone: "1234567892",
                            },
                        ],
                    },
                ],
            },
        ],
    }],
    filteredEmployee: []
};

const recursivelyUpdateEmployee = (employees: TEmployee[], targetId: number, newName: string, newEmail: string, newPhone: string): TEmployee[] => {
    return employees.map((employee) => {
        if (employee.id === targetId) {
            // Update the details for the employee with the target ID
            return {
                ...employee,
                name: newName ? newName : employee.name,
                email: newEmail ? newEmail : employee.email,
                phone: newPhone ? newPhone : employee.phone
            };
        }

        if (employee.children) {
            // Recursively update the details for children
            return {
                ...employee,
                children: recursivelyUpdateEmployee(employee.children, targetId, newName, newEmail, newPhone),
            };
        }

        return employee;
    });
};

const getEmployee = (employees: TEmployee[], regex: RegExp): any => {

    const searchedEmployee: TEmployee[] = []

    for (let i = 0; i < employees.length; i++) {
        if (regex.test(employees[i].name.toLowerCase())) {
            searchedEmployee.push(employees[i])
        }
        if (employees[i].children) {
            const result = getEmployee(employees[i].children!, regex);
            if (result) {
                searchedEmployee.push(...result);
            }
        }
    }
    return searchedEmployee
};
const employeeSlice = createSlice({
    name: "EmployeeSlice",
    initialState,
    reducers: {
        updateEmployee: (state, action) => {
            state.employees = recursivelyUpdateEmployee(state.employees, action.payload.id, action.payload.name, action.payload.email, action.payload.phone)
        },
        searchEmployee: (state, action) => {
            const result = getEmployee(state.employees, action.payload)
            state.filteredEmployee = [...result]
        }
    },
    extraReducers() {

    },
});

export const { updateEmployee, searchEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
