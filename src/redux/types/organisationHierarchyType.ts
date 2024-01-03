export interface TEmployee {
    id: number;
    name: string;
    position: string;
    email: string,
    phone: string,
    team?: string;
    children?: TEmployee[];
}

export type TOrganisationHierarchy = {
    employees: TEmployee[],
    filteredEmployee: TEmployee[] | []
}