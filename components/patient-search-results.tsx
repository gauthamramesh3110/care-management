import PatientSheet from "./patient-sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function PatientSearchResults({ results }: { results: any[] }) {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-medium mb-2">Results</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>DOB</TableHead>
                        <TableHead>Zipcode</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((patient, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <PatientSheet patient={patient} />
                            </TableCell>
                            <TableCell>{patient.BIRTHDATE}</TableCell>
                            <TableCell>{patient.ZIP}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}