import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export default function PatientDetails({ patient }: { patient: any }) {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell><strong>First Name:</strong></TableCell>
                    <TableCell>{patient.FIRST}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Last Name:</strong></TableCell>
                    <TableCell>{patient.LAST}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Birthdate:</strong></TableCell>
                    <TableCell>{patient.BIRTHDATE}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Gender:</strong></TableCell>
                    <TableCell>{patient.GENDER}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Race:</strong></TableCell>
                    <TableCell>{patient.RACE}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Ethnicity:</strong></TableCell>
                    <TableCell>{patient.ETHNICITY}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>Address:</strong></TableCell>
                    <TableCell className="max-w-xs break-words whitespace-normal">{patient.ADDRESS}, {patient.CITY}, {patient.STATE}, {patient.COUNTY} - {patient.ZIP}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><strong>SSN:</strong></TableCell>
                    <TableCell>{patient.SSN}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}